const CACHE = "fc27-lig-v20-12";
const FILES = [
  "./",
  "./index.html",
  "./style.css?v=20.12",
  "./data.js?v=20.12",
  "./storage.js?v=20.12",
  "./sim.js?v=20.12",
  "./analytics.js?v=20.12",
  "./posters.js?v=20.12",
  "./app.js?v=20.12",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.all(
        FILES.map(u =>
          fetch(new Request(u, { cache: "no-cache" }))
            .then(r => (r && r.ok ? c.put(u, r) : null))
            .catch(() => null)
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then(cs => cs.forEach(cl => cl.postMessage({ type: "SW_UPDATED", cache: CACHE })))
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML, JS, CSS: Network-First (güncellemeler anında yansır, çevrimdışıyken önbellekten açılır)
  const isCode = req.mode === "navigate" || /\.(html|js|css)$/i.test(url.pathname) || url.pathname.endsWith("/");
  if (isCode) {
    e.respondWith(
      fetch(new Request(req, { cache: "no-cache" }))
        .then(r => {
          if (r && r.ok) {
            const cl = r.clone();
            caches.open(CACHE).then(c => {
              c.put(req, cl);
              if (req.mode === "navigate") c.put("./index.html", r.clone());
            });
          }
          return r;
        })
        .catch(() =>
          caches.open(CACHE).then(c =>
            c.match(req, { ignoreSearch: true }).then(m => m || (req.mode === "navigate" ? c.match("./index.html", { ignoreSearch: true }) : null))
          )
        )
    );
    return;
  }

  // Logolar ve ikonlar: Cache-First + arka planda güncelleme
  e.respondWith(
    caches.open(CACHE).then(c =>
      c.match(req, { ignoreSearch: true }).then(cached => {
        const net = fetch(req)
          .then(r => {
            if (r && r.ok) c.put(req, r.clone());
            return r;
          })
          .catch(() => cached);
        if (cached) {
          e.waitUntil(net);
          return cached;
        }
        return net;
      })
    )
  );
});
