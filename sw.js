// v4 — GitHub Pages compatible
const CACHE = 'health-stephan-v4';
const ASSETS = [
  '/healthstephan/',
  '/healthstephan/index.html',
  '/healthstephan/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      return Promise.allSettled(ASSETS.map(a => c.add(a)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if(e.request.mode === 'navigate'){
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/healthstephan/index.html'))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
  }
});
