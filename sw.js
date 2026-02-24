const CACHE_NAME = 'folgas-v2.3';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './js/calculadora.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Removendo cache antigo...');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});