const CACHE_NAME = 'absen-bsv-v3';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'logo-bsv.png',
  'icons/icon-32x32.png',
  'icons/icon-180x180.png',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Nunito:wght@400;600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Bersihkan cache versi lama agar file yang sudah diperbarui (logo, warna, dll)
// benar-benar terpakai oleh pengguna, bukan tersangkut di cache lama.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
