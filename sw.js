const CACHE_NAME = 'number-formatter-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Add local assets
      cache.addAll(ASSETS);
      // Try adding tailwind CDN separately so if it fails, it doesn't break the whole install
      cache.add('https://cdn.tailwindcss.com').catch(console.error);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
