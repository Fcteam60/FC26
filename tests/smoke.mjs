#!/usr/bin/env node
// FC 27 Grup Ligi — Otomatik Doğrulama & Duman Testi (v26.3, sıfır bağımlılık)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = f => fs.readFileSync(path.join(ROOT, f), "utf8");
let pass = 0, fail = 0;

function check(label, cond, detail = "") {
  if (cond) {
    pass++;
    console.log(`  ✓ ${label}`);
  } else {
    fail++;
    console.error(`  ✗ ${label}${detail ? " — " + detail : ""}`);
  }
}

console.log("FC 27 Grup Ligi · Otomatik Doğrulama (v26.3)\n");

// 1. JSON & Manifest
for (const jf of ["package.json", "manifest.webmanifest"]) {
  let ok = false;
  try { JSON.parse(read(jf)); ok = true; } catch {}
  check(`JSON geçerli: ${jf}`, ok);
}

// 2. JS Sözdizimi (Node vm.Script derleme kontrolü)
const JS_FILES = ["data.js", "storage.js", "sim.js", "analytics.js", "duel.js", "posters.js", "coop.js", "app.js", "sw.js"];
for (const fn of JS_FILES) {
  let ok = false, err = "";
  try { new vm.Script(read(fn), { filename: fn }); ok = true; } catch (e) { err = e.message; }
  check(`JS sözdizimi: ${fn}`, ok, err);
}

// 3. Veritabanı (data.js) Bütünlüğü
const dataSrc = read("data.js");
const rawMatch = dataSrc.match(/const RAW="([^"]+)"/);
const logosMatch = dataSrc.match(/const LOGOS=(\{[\s\S]*?\});/);
const sqMatch = dataSrc.match(/const SQ=(\{[\s\S]*?\});/);
const teams = rawMatch ? rawMatch[1].split(";").map(s => s.split(",")[0]) : [];
const logos = logosMatch ? JSON.parse(logosMatch[1]) : {};
const squads = {};
if (sqMatch) {
  for (const m of sqMatch[1].matchAll(/"([^"]+)":"([^"]*)"/g)) squads[m[1]] = m[2];
}
check("108 kulüp, 108 arma, 108 kadro", teams.length === 108 && Object.keys(logos).length === 108 && Object.keys(squads).length === 108);

let badXi = 0, dupShirt = 0;
for (const tn of teams) {
  const pls = (squads[tn] || "").split(";").filter(Boolean).map(p => p.split(","));
  if (pls.filter(p => p[5] === "S").length !== 11) badXi++;
  const nums = pls.map(p => p[4]).filter(Boolean);
  if (new Set(nums).size !== nums.length) dupShirt++;
}
check("Tüm 108 kulüpte tam 11 İlk 11 & 0 forma çakışması", badXi === 0 && dupShirt === 0, `badXi=${badXi}, dupShirt=${dupShirt}`);

// 4. Sembol Çakışması Kontrolü
const defs = new Map();
for (const fn of JS_FILES.slice(0, 8)) {
  const src = read(fn);
  for (const m of src.matchAll(/(?:^|\n)\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)) {
    defs.set(m[1], [...(defs.get(m[1]) || []), fn]);
  }
  for (const m of src.matchAll(/(?:^|\n)(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g)) {
    defs.set(m[1], [...(defs.get(m[1]) || []), fn]);
  }
}
const dups = [...defs.entries()].filter(([, v]) => v.length > 1);
check(`0 üst düzey sembol çakışması (${defs.size} sembol)`, dups.length === 0, dups.map(d => d[0]).join(", "));

// 5. CSS Parantez Dengesi & Arka Plan Varlıkları
const cssNoComments = read("style.css").replace(/\/\*[\s\S]*?\*\//g, "");
const openB = (cssNoComments.match(/\{/g) || []).length;
const closeB = (cssNoComments.match(/\}/g) || []).length;
check(`style.css parantez dengesi (${openB} blok)`, openB === closeB);

for (const bg of ["bg-ucl.jpg", "bg-uel.jpg", "bg-uecl.jpg"]) {
  const p = path.join(ROOT, bg);
  check(`Turnuva arka planı mevcut: ${bg}`, fs.existsSync(p) && fs.statSync(p).size > 20000);
}

// 6. data-a Aksiyon Kapsamı
const appSrc = read("app.js"), duelSrc = read("duel.js"), coopSrc = read("coop.js");
const allUiJs = [appSrc, read("sim.js"), read("analytics.js"), duelSrc, read("posters.js"), coopSrc].join("\n");
const usedA = new Set([...allUiJs.matchAll(/data-a="([a-z0-9_]+)"/g)].map(m => m[1]));
const handledA = new Set([
  ...[...appSrc.matchAll(/a=="([a-z0-9_]+)"/g)].map(m => m[1]),
  ...[...duelSrc.matchAll(/a=="([a-z0-9_]+)"/g)].map(m => m[1]),
  ...[...coopSrc.matchAll(/a==="([a-z0-9_]+)"/g)].map(m => m[1])
]);
const unhandled = [...usedA].filter(a => !handledA.has(a));
check(`Tüm data-a aksiyonları karşılıklı (${usedA.size} aksiyon)`, unhandled.length === 0, unhandled.join(", "));

// 7. Sürüm Tutarlılığı
const pkgVer = JSON.parse(read("package.json")).version.replace(/\.0$/, "");
const appVer = (appSrc.match(/const VER="([^"]+)"/) || [])[1];
const swCache = (read("sw.js").match(/const CACHE = "([^"]+)"/) || [])[1];
check(`Sürüm tutarlılığı (v${pkgVer})`, pkgVer === appVer && swCache === `fc27-lig-v${pkgVer.replace(/\./g, "-")}`, `pkg=${pkgVer}, app=${appVer}, sw=${swCache}`);

// 8. Rastgele Takım 9-Takım Bekleme Kuralı & Light-Mode 2P Koruması
check("Rastgele seçimde son 9 takım bekleme kuralı (Solo + 2P)", appSrc.includes("const TEAM_COOLDOWN=9;") && coopSrc.includes("coopRecentCooldownList"));
check("Açık tema 2P misafir satır koruması", read("style.css").includes(':root[data-theme="light"] .bktie.cp-gtie{background:rgba(2,132,199,.10)!important;border-color:rgba(2,132,199,.38)!important}'));

check("Yakınlaştırma kilidi aktif (native PWA viewport)", read("index.html").includes("user-scalable=no"));
check("Ayarlar ekranı setView() aktif sezon referansı güvenli", appSrc.includes("activeCupOf(cur())") && !appSrc.includes("?activeCupOf(s)"));

console.log(`\nSonuç: ${pass} geçti, ${fail} başarısız.`);
if (fail > 0) process.exit(1);
