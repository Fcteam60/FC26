const CACHE = "fc27-lig-v23-8";
const LOGO_CACHE = "fc27-logos-v1";
const FILES = [
  "./",
  "./index.html",
  "./style.css?v=23.8",
  "./data.js?v=23.8",
  "./storage.js?v=23.8",
  "./sim.js?v=23.8",
  "./analytics.js?v=23.8",
  "./duel.js?v=23.8",
  "./posters.js?v=23.8",
  "./coop.js?v=23.8",
  "./app.js?v=23.8",
  "./manifest.webmanifest",
  "./icon-192.png?v=23.8",
  "./icon-512.png?v=23.8",
  "./icon-maskable-512.png?v=23.8",
  "./apple-touch-icon.png?v=23.8"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.all(
        FILES.map(u =>
          fetch(u, { cache: "no-cache" }).then(r => {
            if (!r || !r.ok) throw new Error("Cache fetch failed: " + u);
            return c.put(u, r);
          })
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== LOGO_CACHE).map(k => caches.delete(k))))
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

  // Sürüm etiketli JS ve CSS (?v=...): Cache-First (anında açılış, yeni sürümde URL değişir)
  const isVersionedAsset = /\.(js|css)$/i.test(url.pathname) && /[?&]v=/.test(url.search);
  if (isVersionedAsset) {
    e.respondWith(
      caches.open(CACHE).then(c =>
        c.match(req).then(cached => {
          if (cached) return cached;
          return fetch(req.url, { cache: "no-cache" }).then(r => {
            if (r && r.ok) {
              const cl = r.clone();
              e.waitUntil(c.put(req, cl).catch(() => null));
            }
            return r;
          });
        })
      )
    );
    return;
  }

  // HTML / Navigasyon: Stale-While-Revalidate (önbellekten anında aç, arka planda güncelle)
  const isNav = req.mode === "navigate" || /\.html$/i.test(url.pathname) || url.pathname.endsWith("/");
  if (isNav) {
    e.respondWith(
      caches.open(CACHE).then(c =>
        c.match(req, { ignoreSearch: true })
          .then(m => m || (req.mode === "navigate" ? c.match("./index.html", { ignoreSearch: true }) : null))
          .then(cached => {
            const net = fetch(req.url, { cache: "no-cache" })
              .then(r => {
                if (r && r.ok) {
                  const cl1 = r.clone();
                  const cl2 = req.mode === "navigate" ? r.clone() : null;
                  e.waitUntil(
                    Promise.all([
                      c.put(req, cl1),
                      cl2 ? c.put("./index.html", cl2) : Promise.resolve()
                    ]).catch(() => null)
                  );
                }
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
    return;
  }

  // Logolar kalıcı LOGO_CACHE'te, diğer statik varlıklar sürüm önbelleğinde (Cache-First + arka planda güncelleme)
  const targetCache = /\/logos\//i.test(url.pathname) ? LOGO_CACHE : CACHE;
  e.respondWith(
    caches.open(targetCache).then(c =>
      c.match(req, { ignoreSearch: true }).then(cached => {
        const net = fetch(req)
          .then(r => {
            if (r && r.ok) {
              const cl = r.clone();
              c.put(req, cl).catch(() => null);
            }
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
