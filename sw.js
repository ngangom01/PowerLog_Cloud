// PowerLog service worker.
// IMPORTANT: Google Drive / Google sign-in requests are never touched here, so the
// Drive CSV is always fetched live and never served from a stale cache.
const CACHE = 'powerlog-v9';
const SHELL = ['./', './index.html', './manifest.json'];
const STATIC_CDN = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                       // uploads etc. go straight to network
  const url = new URL(req.url);

  if (url.origin !== self.location.origin) {
    if (!STATIC_CDN.includes(url.hostname)) return;       // googleapis.com/drive, accounts.google.com, ... -> network only
    e.respondWith(                                        // fonts + chart.js: cache, refresh in background
      caches.match(req).then(cached => {
        const net = fetch(req).then(res => {
          if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
          return res;
        }).catch(() => cached);
        return cached || net;
      })
    );
    return;
  }

  // Own files: network first (so updates arrive immediately), cache only as offline fallback
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then(res => {
      if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
