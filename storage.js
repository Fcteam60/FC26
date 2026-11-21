/* ==========================================================================
   FC 27 Grup Ligi — Depolama Katmanı (storage.js)
   - Aşama 4 (v18.2): Tamamlanmış IndexedDB Mimarisi ve Eski Kopya Temizliği
     1) IndexedDB ("fc26lig4" veritabanı, "kv" deposu, "main" ana kaydı) ve
        birebir doğrulamalı localStorage taşıma protokolü ("fc26lig4_idb=1").
     2) Sıralı yazma kuyruğu (queueSave ~200 ms biriktirme, flushSaveQueue) ve
        sekme kapanırken / arka plana giderken (pagehide, visibilitychange)
        bekleyen yazmayı derhal diske yazma garantisi.
     3) Çoklu sekme senkronizasyonu: BroadcastChannel ("fc26lig4_sync") +
        localStorage yedek modunda "storage" olayı ile veri ezilmesini önleme.
     4) Gerçek kota ölçümü (estimateStorage) ve kullanıcı onaylı eski
        localStorage kopyalarını ("fc26lig4", "fc26lig3") güvenli silme
        (legacyLsInfo, clearLegacyLs).
   ========================================================================== */

const IDB_NAME = "fc26lig4";
const IDB_STORE = "kv";
const IDB_MAIN = "main";
const IDB_FLAG = "fc26lig4_idb";
const BC_NAME = "fc26lig4_sync";

const RCV = [
  ["fc26lig4_liste_oncesi", "Takım listesi değişmeden önceki kayıt"],
  ["fc26lig4_degisim_oncesi", "Değiştirmeden önceki kayıt"],
  ["fc26lig4_bozuk", "Okunamayan kayıt"],
  ["fc26lig4_sifirlanan", "Sıfırlamadan önceki kayıt"],
  ["fc26lig4_birlesme_oncesi", "Birleştirmeden önceki kayıt"]
];

const rcvCache = Object.create(null);

let idbConn = null;
let idbMode = "idb"; // "idb" | "ls"
let idbFallbackWarn = "";
let idbInitPromise = null;
let lastMainLen = 0;
let mainReadFailed = false; // ana kayıt okunurken IndexedDB hatası oldu mu (v18.3)

/* ---------- ÇOKLU SEKME: BroadcastChannel + Tab Kimliği ---------- */
const TAB_ID = Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
let bcChan = null;
let onRemoteChangeCb = null;

try {
  if (typeof BroadcastChannel !== "undefined") {
    bcChan = new BroadcastChannel(BC_NAME);
    bcChan.onmessage = (e) => {
      const d = e && e.data;
      if (d && d.type === "STORE_UPDATED" && d.tabId && d.tabId !== TAB_ID) {
        if (typeof onRemoteChangeCb === "function") {
          try { onRemoteChangeCb(d); } catch (err) {}
        }
      }
    };
  }
} catch (e) {
  bcChan = null;
}

function setRemoteUpdateCallback(cb) {
  onRemoteChangeCb = cb;
}

function notifyOtherTabs() {
  if (bcChan) {
    try {
      bcChan.postMessage({ type: "STORE_UPDATED", tabId: TAB_ID, t: Date.now() });
    } catch (e) {}
  }
}

function mapKey(k) {
  return k === "fc26lig4" ? IDB_MAIN : k;
}

function lsGet(k) {
  try {
    return localStorage.getItem(k);
  } catch (e) {
    return null;
  }
}

function lsSet(k, v) {
  try {
    localStorage.setItem(k, String(v));
    return true;
  } catch (e) {
    return false;
  }
}

function lsDel(k) {
  try {
    localStorage.removeItem(k);
    return true;
  } catch (e) {
    return false;
  }
}

function openIdb() {
  return new Promise((resolve, reject) => {
    try {
      if (typeof indexedDB === "undefined" || !indexedDB) {
        return reject(new Error("IndexedDB desteklenmiyor"));
      }
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = () => {
        const db = req.result;
        db.onversionchange = () => {
          try { db.close(); } catch (e) {}
          if (idbConn === db) idbConn = null;
        };
        db.onclose = () => {
          if (idbConn === db) idbConn = null;
        };
        resolve(db);
      };
      req.onerror = () => reject(req.error || new Error("IndexedDB açılamadı"));
      req.onblocked = () => reject(new Error("IndexedDB kilitli (blocked)"));
    } catch (e) {
      reject(e);
    }
  });
}

function idbRawGet(db, key) {
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(IDB_STORE, "readonly");
      const st = tx.objectStore(IDB_STORE);
      const req = st.get(key);
      req.onsuccess = () => resolve(req.result === undefined ? null : req.result);
      req.onerror = () => reject(req.error || new Error("IDB okuma hatası"));
    } catch (e) {
      reject(e);
    }
  });
}

function idbRawSet(db, key, val) {
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(IDB_STORE, "readwrite");
      const st = tx.objectStore(IDB_STORE);
      st.put(val, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error || new Error("IDB yazma hatası"));
      tx.onabort = () => reject(tx.error || new Error("IDB işlem iptali"));
    } catch (e) {
      reject(e);
    }
  });
}

function idbRawDel(db, key) {
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(IDB_STORE, "readwrite");
      const st = tx.objectStore(IDB_STORE);
      st.delete(key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error || new Error("IDB silme hatası"));
      tx.onabort = () => reject(tx.error || new Error("IDB silme iptali"));
    } catch (e) {
      reject(e);
    }
  });
}

let idbReopenPromise = null;
async function ensureIdbConn() {
  if (idbConn) return idbConn;
  if (!idbReopenPromise) {
    idbReopenPromise = openIdb()
      .then(db => { idbConn = db; return db; })
      .finally(() => { idbReopenPromise = null; });
  }
  return idbReopenPromise;
}

async function withIdbRetry(fn) {
  let db = await ensureIdbConn();
  try {
    return await fn(db);
  } catch (e) {
    const nm = e && e.name ? String(e.name) : "";
    const msg = e && e.message ? String(e.message) : "";
    if (nm === "InvalidStateError" || nm === "TransactionInactiveError" || /closing|closed/i.test(msg)) {
      try { if (db) db.close(); } catch (_) {}
      idbConn = null;
      db = await ensureIdbConn();
      return await fn(db);
    }
    throw e;
  }
}

async function initStorage() {
  if (idbInitPromise) return idbInitPromise;
  idbInitPromise = (async () => {
    try {
      const db = await openIdb();
      idbConn = db;
      idbMode = "idb";

      // 1. Ana kayıt ("main") kontrolü ve taşıma protokolü
      const existingMain = await idbRawGet(db, IDB_MAIN);
      const hasFlag = lsGet(IDB_FLAG) === "1";

      if (existingMain === null && !hasFlag) {
        const lsMain = lsGet("fc26lig4");
        if (lsMain !== null) {
          await idbRawSet(db, IDB_MAIN, lsMain);
          const verifyMain = await idbRawGet(db, IDB_MAIN);
          if (verifyMain === lsMain) {
            lsSet(IDB_FLAG, "1");
            lastMainLen = lsMain.length;
          } else {
            throw new Error("Taşıma doğrulaması başarısız oldu");
          }
        } else {
          const lsV3 = lsGet("fc26lig3");
          if (lsV3 !== null) {
            await idbRawSet(db, "fc26lig3", lsV3);
          }
          lsSet(IDB_FLAG, "1");
        }
      } else if (existingMain !== null) {
        lastMainLen = String(existingMain).length;
        if (!hasFlag) lsSet(IDB_FLAG, "1");
      }

      // 2. Kurtarma kopyalarını (RCV) IndexedDB'ye taşı
      for (const [rk] of RCV) {
        const idbVal = await idbRawGet(db, rk);
        if (idbVal !== null) {
          rcvCache[rk] = String(idbVal);
        } else {
          const lsVal = lsGet(rk);
          if (lsVal !== null) {
            try {
              await idbRawSet(db, rk, lsVal);
              const vRk = await idbRawGet(db, rk);
              if (vRk === lsVal) {
                rcvCache[rk] = lsVal;
                lsDel(rk);
              }
            } catch (e) {
              rcvCache[rk] = lsVal;
            }
          }
        }
      }
      return { mode: "idb", warn: "" };
    } catch (e) {
      idbConn = null;
      idbMode = "ls";
      idbFallbackWarn = "Tarayıcı gelişmiş veritabanını (IndexedDB) açamadı; uygulama yedek plan olarak klasik depolama (localStorage) modunda çalışıyor.";
      for (const [rk] of RCV) {
        const v = lsGet(rk);
        if (v) rcvCache[rk] = v;
        else delete rcvCache[rk];
      }
      return { mode: "ls", warn: idbFallbackWarn };
    }
  })();
  return idbInitPromise;
}

const kv = {
  async init() {
    return initStorage();
  },
  mode() {
    return idbMode;
  },
  fallbackWarn() {
    return idbFallbackWarn;
  },
  async get(k) {
    await initStorage();
    if (idbMode === "idb") {
      try {
        const val = await withIdbRetry(db => idbRawGet(db, mapKey(k)));
        if (k === "fc26lig4") mainReadFailed = false;
        if (val !== null && k === "fc26lig4") lastMainLen = String(val).length;
        return val === null ? null : String(val);
      } catch (e) {
        // Okuma HATASI "kayıt yok" ile karıştırılmasın: ana kayıtta bayrak koy (v18.3)
        if (k === "fc26lig4") mainReadFailed = true;
        return null;
      }
    }
    const v = lsGet(k);
    if (v !== null && k === "fc26lig4") lastMainLen = v.length;
    return v;
  },
  async set(k, v) {
    await initStorage();
    const s = String(v);
    if (idbMode === "idb") {
      try {
        await withIdbRetry(db => idbRawSet(db, mapKey(k), s));
        if (k === "fc26lig4") {
          lastMainLen = s.length;
          if (lsGet(IDB_FLAG) !== "1") lsSet(IDB_FLAG, "1");
          notifyOtherTabs();
        }
        if (RCV.some(x => x[0] === k)) rcvCache[k] = s;
        return true;
      } catch (e) {
        return false;
      }
    }
    const ok = lsSet(k, s);
    if (ok) {
      if (k === "fc26lig4") {
        lastMainLen = s.length;
        notifyOtherTabs();
      }
      if (RCV.some(x => x[0] === k)) rcvCache[k] = s;
    }
    return ok;
  },
  async del(k) {
    await initStorage();
    if (idbMode === "idb") {
      try {
        await withIdbRetry(db => idbRawDel(db, mapKey(k)));
        if (RCV.some(x => x[0] === k)) delete rcvCache[k];
        return true;
      } catch (e) {
        return false;
      }
    }
    const ok = lsDel(k);
    if (RCV.some(x => x[0] === k)) delete rcvCache[k];
    return ok;
  }
};

/* ---------- YAZMA KUYRUĞU VE KAPANMA GARANTİSİ ---------- */
let qTimer = null;
let qPendingRaw = null;
let qWaiters = [];
let qWriting = false;
let qActivePromise = null;
let qStatusCb = null;

function setSaveStatusCallback(cb) {
  qStatusCb = cb;
}

function processWriteQueue() {
  if (qActivePromise) return qActivePromise;
  qWriting = true;
  qActivePromise = (async () => {
    let lastOk = true;
    try {
      while (qPendingRaw !== null) {
        const rawToWrite = qPendingRaw;
        const waitersBatch = qWaiters.splice(0, qWaiters.length);
        qPendingRaw = null;
        let ok = false;
        try {
          ok = await kv.set("fc26lig4", rawToWrite);
        } catch (e) {
          ok = false;
        }
        lastOk = ok;
        if (typeof qStatusCb === "function") {
          try { qStatusCb(ok); } catch (e) {}
        }
        waitersBatch.forEach(r => r(ok));
      }
      return lastOk;
    } finally {
      qWriting = false;
      qActivePromise = null;
      if (qPendingRaw !== null) processWriteQueue();
    }
  })();
  return qActivePromise;
}

function queueSave(raw, immediate) {
  qPendingRaw = String(raw);
  lastMainLen = qPendingRaw.length;
  return new Promise(resolve => {
    qWaiters.push(resolve);
    if (immediate) {
      if (qTimer !== null) {
        clearTimeout(qTimer);
        qTimer = null;
      }
      processWriteQueue();
    } else if (qTimer === null) {
      qTimer = setTimeout(() => {
        qTimer = null;
        processWriteQueue();
      }, 200);
    }
  });
}

function flushSaveQueue() {
  if (qTimer !== null) {
    clearTimeout(qTimer);
    qTimer = null;
  }
  if (qActivePromise) {
    return qActivePromise.then(() => (qPendingRaw !== null ? processWriteQueue() : true));
  }
  if (qPendingRaw !== null) {
    return processWriteQueue();
  }
  return Promise.resolve(true);
}

function hadMainReadFailure() {
  return mainReadFailed;
}

// Sekme arka plana giderken veya kapanırken bekleyen yazmayı derhal başlat
if (typeof addEventListener === "function") {
  addEventListener("pagehide", () => { flushSaveQueue(); });
}
if (typeof document !== "undefined" && typeof document.addEventListener === "function") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushSaveQueue();
  });
}

/* ---------- ESKİ LOCALSTORAGE ANA KOPYASI TESPİTİ VE GÜVENLİ TEMİZLİĞİ (v18.2) ---------- */
function legacyLsInfo() {
  if (idbMode !== "idb" || lsGet(IDB_FLAG) !== "1") {
    return { hasLegacy: false, bytes: 0 };
  }
  const r4 = lsGet("fc26lig4");
  const r3 = lsGet("fc26lig3");
  if (r4 === null && r3 === null) {
    return { hasLegacy: false, bytes: 0 };
  }
  const bytes = ((r4 ? r4.length : 0) + (r3 ? r3.length : 0)) * 2;
  return { hasLegacy: true, bytes };
}

async function clearLegacyLs() {
  await initStorage();
  if (idbMode !== "idb" || lsGet(IDB_FLAG) !== "1") {
    return false;
  }
  try {
    // Silmeden önce IndexedDB'de "main" kaydının gerçekten var ve geçerli olduğunu doğrula
    const mainVal = await withIdbRetry(db => idbRawGet(db, IDB_MAIN));
    if (!mainVal || typeof mainVal !== "string" || mainVal.length < 10) {
      return false;
    }
    lsDel("fc26lig4");
    lsDel("fc26lig3");
    return true;
  } catch (e) {
    return false;
  }
}

/* ---------- KOTA VE GERÇEK KULLANIM TAHMİNİ ---------- */
async function estimateStorage() {
  await initStorage();
  let rcvBytes = 0;
  for (const [rk] of RCV) {
    if (rcvCache[rk]) rcvBytes += rcvCache[rk].length * 2;
  }
  const appBytes = lastMainLen * 2 + rcvBytes;
  const leg = legacyLsInfo();
  let usage = appBytes;
  let quota = idbMode === "idb" ? 0 : 5 * 1024 * 1024;
  try {
    if (typeof navigator !== "undefined" && navigator.storage && typeof navigator.storage.estimate === "function") {
      const est = await navigator.storage.estimate();
      if (est) {
        if (Number.isFinite(est.usage) && est.usage > 0) usage = Math.max(est.usage, appBytes);
        if (Number.isFinite(est.quota) && est.quota > 0) quota = est.quota;
      }
    }
  } catch (e) {}
  return {
    mode: idbMode,
    appBytes,
    rcvBytes,
    usage,
    quota,
    legacyBytes: leg.bytes,
    hasLegacy: leg.hasLegacy
  };
}

async function rcvRefresh() {
  await initStorage();
  for (const [k] of RCV) {
    const v = await kv.get(k);
    if (v) rcvCache[k] = v;
    else delete rcvCache[k];
  }
}

function rcvGet(k) {
  if (k in rcvCache) return rcvCache[k];
  if (idbMode === "ls") {
    const v = lsGet(k);
    if (v) rcvCache[k] = v;
    return v;
  }
  return null;
}
