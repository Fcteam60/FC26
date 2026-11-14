// Service worker davranış testi: node tests/sw-test.js
const fs = require("fs"), vm = require("vm"), path = require("path");
const code = fs.readFileSync(path.join(__dirname, "..", "sw.js"), "utf8");
let pass = 0, fail = 0; const t = (n, c, x) => { if (c) pass++; else { fail++; console.log("  ✗", n, x ?? ""); } };
class Req { constructor(u, o = {}) { this.url = new URL(u, "https://x.test/").href; this.method = "GET"; this.mode = o.mode || "cors"; this.cache = o.cache || "default"; } }
const Resp = class { constructor(b, ok = true) { this.body = b; this.ok = ok; } clone() { return new Resp(this.body, this.ok); } static error() { const r = new Resp("ERR", false); r.err = true; return r; } };
function run({ online, preCache = {} }) {
  const store = { "fc26-lig-v17-0": { ...preCache } }; const listeners = {}; const fetched = [];
  const caches = {
    open: async n => ({ put: async (r, v) => { (store[n] = store[n] || {})[r.url] = v; }, add: async r => { const rq = r instanceof Req ? r : new Req(r); fetched.push({ url: rq.url, cache: rq.cache }); if (!online) throw new Error("off"); (store[n] = store[n] || {})[rq.url] = new Resp("net:" + rq.url); } }),
    match: async (r, o = {}) => { if (typeof r === "string") r = new Req(r); const all = store["fc26-lig-v17-0"] || {}; const u = o.ignoreSearch ? r.url.split("?")[0] : r.url; return Object.entries(all).find(([k]) => (o.ignoreSearch ? k.split("?")[0] : k) === u)?.[1]; },
    keys: async () => Object.keys(store), delete: async k => { delete store[k]; } };
  const ctx = { self: { addEventListener: (e, f) => { listeners[e] = f; }, skipWaiting: async () => {}, clients: { claim: async () => {} } }, caches, Request: Req, Response: Resp, URL, location: { origin: "https://x.test" }, console: { warn() {} },
    fetch: async (r, o) => { fetched.push({ url: r.url, cache: o && o.cache }); if (!online) throw new Error("off"); return new Resp("net:" + r.url); } };
  vm.createContext(ctx); vm.runInContext(code, ctx);
  return { ctx, listeners, store, fetched };
}
const fire = async (L, req) => { let p, waits = []; L.fetch({ request: req, respondWith: x => { p = x; }, waitUntil: x => waits.push(x) }); const res = await p; await Promise.all(waits); return { res, waited: waits.length }; };

(async () => {
  console.log("kurulum");
  { const s = run({ online: true }); let w; await s.listeners.install({ waitUntil: x => { w = x; } }); await w;
    t("tüm dosyalar önbelleğe alındı", Object.keys(s.store["fc26-lig-v17-0"] || {}).length === 7, Object.keys(s.store["fc26-lig-v17-0"] || {}).length);
    t('install isteklerinde cache:"reload" var', s.fetched.length === 7 && s.fetched.every(f => f.cache === "reload"), s.fetched.slice(0, 2)); }
  { const s = run({ online: false }); let w; await s.listeners.install({ waitUntil: x => { w = x; } }); let ok = true; try { await w; } catch { ok = false; } t("internet yokken kurulum çökmez", ok); }
  console.log("istek yönetimi");
  { const u = "https://x.test/index.html"; const s = run({ online: true, preCache: { [u]: new Resp("CACHED") } });
    const { res, waited } = await fire(s.listeners, new Req(u)); t("önbellek varsa anında önbellek döner", res.body === "CACHED");
    t("arka plan güncellemesi waitUntil içinde", waited === 1, waited);
    t("ağdan alınan yeni sürüm önbelleğe yazıldı", s.store["fc26-lig-v17-0"][u].body === "net:" + u); }
  { const u = "https://x.test/index.html"; const s = run({ online: false, preCache: { [u]: new Resp("CACHED") } });
    const { res } = await fire(s.listeners, new Req(u)); t("çevrimdışı: önbellek döner, hata yok", res.body === "CACHED"); }
  { const idx = "https://x.test/index.html"; const s = run({ online: false, preCache: { [idx]: new Resp("INDEX") } });
    const { res } = await fire(s.listeners, new Req("https://x.test/?utm=1", { mode: "navigate" })); t("çevrimdışı gezinme: ?utm olsa bile index.html", res.body === "INDEX", res.body); }
  { const s = run({ online: false }); const { res } = await fire(s.listeners, new Req("https://x.test/veri.json")); t("çevrimdışı gezinme dışı istek: HTML değil, hata", res.err === true); }
  { const s = run({ online: true }); const { res } = await fire(s.listeners, new Req("https://x.test/yeni.css")); t("önbellek yoksa ağdan alır", res.body === "net:https://x.test/yeni.css"); }
  { const s = run({ online: true }); let called = false; s.listeners.fetch({ request: Object.assign(new Req("https://x.test/a"), { method: "POST" }), respondWith: () => { called = true; }, waitUntil() {} }); t("POST isteğine karışmaz", !called); }
  console.log(`\n${pass} geçti, ${fail} kaldı`); process.exit(fail ? 1 : 0);
})();
