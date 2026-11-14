// Birim testleri: node tests/run.js   (derleme aracı gerekmez, tarayıcı gerekmez)
// index.html içindeki <script> kodunu sahte bir DOM ile yükler ve saf fonksiyonları sınar.
const fs = require("fs"), vm = require("vm"), path = require("path");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const src = html.slice(html.indexOf("<script>") + 8, html.lastIndexOf("</script>"));
const mem = {};
const mkEl = () => new Proxy(function () {}, { get: (t, k) => { if (k === "style" || k === "dataset" || k === "classList") return mkEl(); if (k === "firstChild") return null; if (k === "textContent" || k === "innerHTML" || k === "value") return ""; if (k === Symbol.toPrimitive) return () => ""; return mkEl(); }, set: () => true, apply: () => mkEl() });
const doc = new Proxy({}, { get: (t, k) => (k === "addEventListener" ? () => {} : k === "hidden" ? false : mkEl()), set: () => true });
const ctx = { document: doc, localStorage: { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { if (mem.__fail) throw new Error("quota"); mem[k] = String(v); }, removeItem: k => { delete mem[k]; } },
  navigator: { userAgent: "node" }, location: { origin: "x", href: "x", search: "", hash: "" }, history: { replaceState() {} },
  addEventListener() {}, scrollTo() {}, requestAnimationFrame() {}, matchMedia: () => ({ matches: false, addEventListener() {} }),
  performance, setTimeout, clearTimeout, console, Date, Math, JSON, Intl, URL, TextEncoder, TextDecoder, atob, btoa,
  Blob: function () {}, File: function () {}, FileReader: function () {}, Image: function () {}, getComputedStyle: () => ({}), CSS: { supports: () => false } };
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(src + "\n;globalThis.__x={store:()=>store,T:()=>T,TN:()=>TN,cleanStats,esc,st,VER,sqFindAny,dotsOf,bkName,slug,impWarn}", ctx);

let pass = 0, fail = 0;
const t = (name, cond, extra) => { if (cond) pass++; else { fail++; console.log("  ✗", name, extra !== undefined ? "→ " + JSON.stringify(extra) : ""); } };
const near = (a, b, e = 1e-6) => Math.abs(a - b) <= e;
const mk = (gf, ga, mx, ox) => ({ gf, ga, et: 0, pf: null, pa: null, stats: { myXg: mx, oppXg: ox } });

console.log("calcMatchXpts");
{
  const r = ctx.calcMatchXpts(1.5, 1.0);
  t("olasılık toplamı 1", near(r.pw + r.pd + r.pl, 1), r);
  t("xPts + rakip xPts ≈ 2-3 aralığında", r.xPts + r.opXpts > 2.5 && r.xPts + r.opXpts < 3, r);
  const s = ctx.calcMatchXpts(1, 1); t("eşit xG → simetrik xPts", near(s.xPts, s.opXpts));
  const hi = ctx.calcMatchXpts(7, 0); t("xG 7-0 → xPts ≈ 3", hi.xPts > 2.95, hi.xPts);
  const cap = ctx.calcMatchXpts(12, 0); t("xG 12 → 7'ye sınırlanır, toplam yine 1", near(cap.pw + cap.pd + cap.pl, 1) && cap.xPts > 2.95, cap);
  t("xG yoksa null", ctx.calcMatchXpts(null, 1) === null && ctx.calcMatchXpts(1, undefined) === null && ctx.calcMatchXpts("a", 1) === null);
  t("negatif xG 0 kabul edilir", near(ctx.calcMatchXpts(-3, 0).pd, 1));
  t("önbellek aynı nesneyi döndürür", ctx.calcMatchXpts(1.5, 1.0) === r);
  const t0 = process.hrtime.bigint(); for (let i = 0; i < 20000; i++) ctx.calcMatchXpts(1 + (i % 50) / 25, 0.5 + (i % 30) / 30);
  t("20.000 çağrı < 100 ms (önbellek)", Number(process.hrtime.bigint() - t0) / 1e6 < 100);
}

console.log("matchDeserve");
{
  const k = (...a) => ctx.matchDeserve(mk(...a)).k;
  t("1-0, xG 0.30-0.29 → fair (gürültü etiketi yok)", k(1, 0, 0.30, 0.29) === "fair");
  t("1-0, xG 0.29-0.30 → fair", k(1, 0, 0.29, 0.30) === "fair");
  t("3-0 galibiyet, xG 0.2-1.9 → undeserved", k(3, 0, 0.2, 1.9) === "undeserved");
  t("0-2 mağlubiyet, xG 2.5-0.2 → unlucky", k(0, 2, 2.5, 0.2) === "unlucky");
  t("2-0, xG 2.0-0.5 → deserved", k(2, 0, 2.0, 0.5) === "deserved");
  t("1-1, xG 1.8-0.4 → unlucky (kaçan galibiyet)", k(1, 1, 1.8, 0.4) === "unlucky");
  t("xG yoksa null", ctx.matchDeserve({ gf: 1, ga: 0, stats: null }) === null);
}

console.log("cleanStats");
{
  const c = ctx.__x.cleanStats, w = ctx.cleanStatsW;
  t("isabetli şut toplam şutu aşamaz", c({ myShots: "3", mySot: "9" }).mySot === 3);
  t("uyarı üretir", w({ myShots: "3", mySot: "9" }).warns.length === 1);
  t("xG 99 → 7", c({ myXg: "99" }).myXg === 7);
  t("xG uyarısı", w({ myXg: "99" }).warns.some(x => x.includes("7")));
  t("virgüllü ondalık", c({ myXg: "1,35" }).myXg === 1.35);
  t("topla oynama 150 → 100, rakip tamamlanır", c({ myPos: "150" }).myPos === 100 && c({ myPos: "150" }).oppPos === 0);
  t("topla oynama uyarısı", w({ myPos: "150" }).warns.length === 1);
  t("karşı taraf otomatik tamamlanır", c({ myPos: "58" }).oppPos === 42);
  t("negatif xG → 0", c({ myXg: "-2" }).myXg === 0);
  t("hepsi boş → null", c({}) === null && c(null) === null && c({ myXg: "" }) === null);
  t("saf: global durumu değiştirmez", (() => { ctx.__x.st.stwarn = "x"; w({ myXg: "99" }); return ctx.__x.st.stwarn === "x"; })());
}

console.log("mergeSeasons");
{
  const M = (id, gf, xg) => ({ id, gf, ga: 0, on: "X", rd: "Grup", sc: {}, as: {}, stats: { myXg: xg } });
  const local = { id: 1, name: "S", date: "d", ut: 2000, mt: [M(1, 2, 1.5), M(3, 1, 0.9)], pl: [] };
  const back = { id: 1, name: "S", date: "d", ut: 1000, mt: [M(1, 2, 0.4), M(2, 0, 0.3), M(3, 1, 0.9), M(4, 3, 2)], pl: [] };
  const r = ctx.mergeSeasons(local, back);
  t("maçlar id'ye göre birleşir", r.mt.map(m => m.id).join() === "1,2,3,4", r.mt.map(m => m.id));
  t("yeni olan (yerel) düzeltme korunur", r.mt.find(m => m.id === 1).stats.myXg === 1.5);
  t("toplamlar (ts) maçlardan yeniden hesaplanır", r.ts.gf === 6, r.ts);
  const eq = ctx.mergeSeasons({ id: 1, name: "S", date: "d", mt: [M(1, 1)], pl: [] }, { id: 1, name: "S", date: "d", mt: [M(1, 5)], pl: [] });
  t("ut yoksa yerel kazanır", eq.mt[0].gf === 1);
  const pl = ctx.mergeSeasons({ id: 1, name: "S", date: "d", ut: 2, mt: [{ ...M(1, 2), sc: { "Mbappé": 2 } }], pl: [] }, { id: 1, name: "S", date: "d", ut: 1, mt: [{ ...M(2, 1), sc: { "Mbappé": 1 } }], pl: [] });
  t("oyuncu golleri birleşen maçlardan toplanır", (pl.pl.find(p => p.n.includes("Mbapp")) || {}).g === 3, pl.pl);
}

console.log("tahmin motoru");
{
  const X = ctx.__x, T = X.T(), s = X.store().seasons[0]; s.my = 0;
  let bad = 0;
  for (let i = 1; i < T.length; i += 4) { const p = ctx.predict(s, i); if (p && p.w + p.d + p.l !== 100) bad++; }
  t("olasılık toplamı her zaman 100", bad === 0);
  t("geçersiz takım → null", ctx.predict(s, 99999) === null);
}

console.log("güvenlik ve yedek");
{
  t("esc: tüm tehlikeli karakterler", ctx.__x.esc(`<a href="x" onclick='y'>&`) === "&lt;a href=&quot;x&quot; onclick=&#39;y&#39;&gt;&amp;");
  const txt = JSON.stringify({ a: "çğıöşü İ 🏆" });
  t("b64 gidiş-dönüş (Türkçe + emoji)", ctx.b64Dec(ctx.b64Enc(txt)) === txt);
  t("geçersiz yedek reddedilir", ctx.parseBk("bu bir yedek değil") === null && ctx.parseBk("") === null && ctx.parseBk("{}") === null);
}


console.log("v17.1 denetim iyileştirmeleri");
{
  t("VER 17.3 olarak güncellendi", ctx.__x.VER === "17.3", ctx.__x.VER);
  t("sqFindAny O(1) Map önbelleği çalışıyor", ctx.__x.sqFindAny("Vitinha") && ctx.__x.sqFindAny("vitinha").p.n === "Vitinha");
  const remapTest = { tn: ["Inter", "Milan"], seasons: [{ id: 1, name: "S1", date: "d", sn: { "Inter": [85, 85, 85, 85] }, mt: [] }] };
  ctx.remap(remapTest);
  t("remap s.sn anahtarlarını ALIAS üzerinden günceller (Inter -> Lombardia FC)", Array.isArray(remapTest.seasons[0].sn["Lombardia FC"]));
  const fdHtml = ctx.__x.dotsOf([{ gf: 2, ga: 0, on: "PSG" }]);
  t("dotsOf renk körlüğü için aria-label ve title içerir", fdHtml.includes('aria-label="Galibiyet (G)"') && fdHtml.includes('role="img"'));
}


console.log("v17.2 sahip adı, sürüm, yedek güvenliği");
{
  const X = ctx.__x; X.store().owner = "Ali Çağrı";
  t("yedek adı: sahip + tarih, Türkçe harfler temiz", /^fc27-yedek-Ali-Cagri-\d{4}-\d\d-\d\d\.json$/.test(X.bkName()), X.bkName());
  X.store().owner = ""; t("sahip yoksa ad yine geçerli", /^fc27-yedek-\d{4}-\d\d-\d\d\.json$/.test(X.bkName()), X.bkName());
  X.store().owner = "Ali Çağrı";
  t("ownDiff: farklı sahip → true", ctx.ownDiff({ owner: "Veli" }) === true);
  t("ownDiff: aynı sahip / sahipsiz yedek → false", ctx.ownDiff({ owner: "Ali Çağrı" }) === false && ctx.ownDiff({}) === false && ctx.ownDiff(null) === false);
  t("verGt sürüm karşılaştırması", ctx.verGt("17.3", "17.2") && ctx.verGt("17.10", "17.9") && !ctx.verGt("17.2", "17.2") && !ctx.verGt("17.1", "17.2"));
  t("impWarn: farklı sahip ve yeni sürüm uyarısı", X.impWarn({ owner: "Veli", app: "99.0" }).includes("Veli") && X.impWarn({ owner: "Veli", app: "99.0" }).includes("v99.0"));
  t("impWarn: sorun yoksa boş", X.impWarn({ owner: "Ali Çağrı", app: "17.2" }) === "");
  // 14 sezonluk gidiş-dönüş (yedek -> doğrulama -> aynı veri)
  const base = X.store().seasons[0], o = { v: 4, tn: X.TN(), cur: 14, nx: 14, seasons: [] };
  for (let k = 1; k <= 14; k++) { const s = JSON.parse(JSON.stringify(base)); s.id = k; s.name = "Sezon " + k; s.ut = k; s.mt = [];
    for (let i = 0; i < 40; i++) s.mt.push({ id: k * 1000 + i, opp: 1, on: "X", rd: "Grup", gf: i % 4, ga: i % 3, et: 0, pf: null, pa: null, sc: {}, as: {}, mom: "", stats: i % 2 ? { myXg: 1.2, oppXg: 0.7 } : null });
    o.seasons.push(s); }
  const p = ctx.parseBk(JSON.stringify(o));
  t("14 sezon yedeği doğrulanır", p !== null && p.seasons.length === 14);
  t("gidiş-dönüşte maçlar birebir aynı", p && JSON.stringify(p.seasons.map(s => s.mt)) === JSON.stringify(o.seasons.map(s => s.mt)));
  const r = ctx.mergeSeasons(p.seasons[3], p.seasons[3]);
  t("kendisiyle birleştirme: maç sayısı değişmez (çift sayım yok)", r.mt.length === 40 && r.ts.gf === p.seasons[3].mt.reduce((a, m) => a + m.gf, 0));
  // sıfırlama: depolama doluyken durmalı, sahip adı korunmalı
  const before = X.store(); mem.__fail = true; const msg = ctx.resetAll(); mem.__fail = false;
  t("depolama doluyken sıfırlama durur, veri korunur", X.store() === before && typeof msg === "string" && msg.startsWith("Sıfırlanmadı"), msg);
  ctx.resetAll();
  t("normal sıfırlama: kurtarma kopyası yazıldı, sahip adı korundu", X.store() !== before && X.store().owner === "Ali Çağrı" && !!mem["fc26lig4_sifirlanan"]);
}

console.log(`\n${pass} geçti, ${fail} kaldı`);
process.exit(fail ? 1 : 0);
