const CACHE = "fc26-lig-v8";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

// Tek bir dosya eksik/404 olsa bile kurulum tamamen başarısız olmasın (addAll hepsini iptal eder).
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(FILES.map(f => c.add(f).catch(() => {}))))
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

// Önce ağ, olmazsa önbellek. GitHub Pages _headers dosyasını okumaz ve dosyaları ~10 dk tarayıcı
// önbelleğinde tutar; bu yüzden ağ isteğinde HTTP önbelleğini atlıyoruz ({cache:"no-cache"}),
// böylece index.html güncellenince hemen yeni sürüm gelir. İnternet yokken önbellekten açılır.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-cache" })
      .then(res => {
        if (res && res.ok && new URL(e.request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
