// RemoteRozgar Service Worker for Android PWA
const CACHE_NAME = 'remoterozgar-cache-v3';
const API_CACHE_NAME = 'remoterozgar-api-cache-v3';


const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/logo.png',
  '/icon.png',
  '/favicon.ico',
  '/download',
];

// -------------------------------------------------------------------------
// Install: pre-cache static assets safely
// -------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        STATIC_ASSETS.map(async (asset) => {
          try {
            await cache.add(asset);
          } catch {
            // Gracefully ignore single asset fetch errors
          }
        })
      );
    })
  );
  self.skipWaiting();
});


// -------------------------------------------------------------------------
// Activate: remove stale caches
// -------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== API_CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// -------------------------------------------------------------------------
// Fetch: cache-first for static, stale-while-revalidate for API
// -------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const url = new URL(event.request.url);

  // API routes: network-first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          if (res && res.status === 200) {
            const resClone = res.clone();
            caches.open(API_CACHE_NAME).then((cache) => cache.put(event.request, resClone));
          }
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          return new Response(JSON.stringify({ success: false, error: 'Offline' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
          });
        })
    );
    return;
  }


  // Static assets: cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        // Background update
        fetch(event.request)
          .then((res) => {
            if (res && res.status === 200 && res.type === 'basic') {
              const resClone = res.clone();
              caches.open(CACHE_NAME).then((c) => c.put(event.request, resClone));
            }
          })
          .catch(() => {});
        return cached;
      }
      return fetch(event.request)
        .then((res) => {
          if (!res || res.status !== 200 || res.type !== 'basic') return res;
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, resClone));
          return res;
        })
        .catch(() => {
          // Offline fallback: return cached home for navigation requests
          if (event.request.mode === 'navigate') return caches.match('/');
        });
    })
  );

});

