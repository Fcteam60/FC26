const CACHE = "fc27-lig-v20-1";
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./data.js",
  "./storage.js",
  "./sim.js",
  "./analytics.js",
  "./posters.js",
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

  if (req.mode === "navigate") {
    e.respondWith(
      caches.open(CACHE).then(c =>
        c.match("./index.html", { ignoreSearch: true }).then(cached => {
          const net = fetch(new Request("./index.html", { cache: "no-cache" }))
            .then(r => {
              if (r && r.ok) {
                c.put("./index.html", r.clone());
                c.put("./", r.clone());
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
