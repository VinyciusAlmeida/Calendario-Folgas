const CACHE_NAME = 'folgas-v2.5';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './js/calculadora.js',
  './manifest.json',
  './assets/icons/favicon.svg'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((response) => {
                return response || new Response('', { status: 404, statusText: 'Not Found' });
            });
        })
    );
});