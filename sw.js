const CACHE_PREFIX = 'anarkshop-shell-';
const CACHE = `${CACHE_PREFIX}v4`;
const SHELL = ['./', './index.html', './manifest.json', './icon.svg', './app.js', './app.css'];
const scopePath = new URL(self.registration.scope).pathname;
async function reportCacheError() {
  try {
    const clients = await self.clients.matchAll({ type:'window', includeUncontrolled:true });
    clients.forEach(client => client.postMessage({ type:'ANARKSHOP_CACHE_ERROR' }));
  } catch (error) { console.error('AnarkShop could not report a cache error.', error); }
}

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE)
    .then(cache => cache.addAll(SHELL))
    .catch(async error => {
      await reportCacheError();
      throw error;
    }));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'ANARKSHOP_SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(scopePath)) return;

  if (request.mode === 'navigate') {
    const cachePromise = caches.open(CACHE);
    const networkPromise = fetch(request);
    const cacheWrite = networkPromise.then(response => {
      if (response.ok) return cachePromise.then(cache => cache.put('./index.html', response.clone())).catch(reportCacheError);
    }).catch(() => {});
    event.waitUntil(cacheWrite);
    event.respondWith(networkPromise.catch(() => cachePromise.then(cache => cache.match('./index.html')).then(cached => cached || Response.error())));
    return;
  }

  const cachePromise = caches.open(CACHE);
  const networkPromise = fetch(request);
  const cacheWrite = networkPromise.then(response => {
    if (response.ok) return cachePromise.then(cache => cache.put(request, response.clone())).catch(reportCacheError);
  }).catch(() => {});
  event.waitUntil(cacheWrite);
  event.respondWith(cachePromise.then(cache => cache.match(request)).then(cached => cached || networkPromise));
});
