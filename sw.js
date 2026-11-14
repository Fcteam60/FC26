const CACHE = "fc27-lig-v17-4";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

// Kurulumda tarayıcı HTTP önbelleğini atla (cache:"reload"): GitHub Pages dosyaları ~10 dk önbellekte tutar,
// yoksa yeni SW eski index.html'i önbelleğe alabilir. Tek dosya eksik olsa bile kurulum başarısız olmaz.
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(FILES.map(f =>
        c.add(new Request(f, { cache: "reload" })).catch(err => console.warn("SW asset skip:", f, err))
      )))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-While-Revalidate: önbellekten anında aç, arka planda ağdan güncelle.
// Arka plan güncellemesi e.waitUntil içinde: tarayıcı işlem bitmeden SW'yi kapatamaz.
// Sayfa gezintisinde sorgu dizesi (?utm=...) önbellek eşleşmesini bozmasın diye ignoreSearch kullanılır.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const isNav = e.request.mode === "navigate";
  e.respondWith((async () => {
    const cached = await caches.match(e.request, { ignoreSearch: isNav });
    const update = fetch(e.request, { cache: "no-cache" }).then(async res => {
      if (res && res.ok && new URL(e.request.url).origin === location.origin) {
        const c = await caches.open(CACHE);
        await c.put(e.request, res.clone());
      }
      return res;
    });
    if (cached) { e.waitUntil(update.catch(() => {})); return cached; }
    try { return await update; }
    catch (_) {
      if (isNav) { const idx = await caches.match("./index.html"); if (idx) return idx; }
      return Response.error();
    }
  })());
});
