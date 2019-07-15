/* global self */
(function () {
  const version = 'v6';
  const cacheName = ':juanvilleladev:';
  const staticCacheName = `${version}${cacheName}static`;
  const pagesCacheName = `${cacheName}pages`;
  const imagesCacheName = `${cacheName}images`;
  const staticAssets = [
    '/',
    '/posts/',
    '/offline/',
    '/img/juan.png',
    '/img/juan.webp',
    '/fonts/Rubik-Regular.woff',
    '/fonts/Rubik-Regular.woff2',
    '/fonts/Rubik-Regular-sub.woff',
    '/fonts/Rubik-Regular-sub.woff2',
    '/fonts/Rubik-Bold.woff',
    '/fonts/Rubik-Bold.woff2',
    '/fonts/Rubik-Bold-sub.woff',
    '/fonts/Rubik-Bold-sub.woff2',
    '/fonts/FiraCode-Regular.woff',
    '/fonts/FiraCode-Regular.woff',
    '/css/styles.css',
    '/js/scripts.js',
  ];
  function updateStaticCache() {
    // These items must be cached for the Service Worker to complete installation
    return caches.open(staticCacheName).then(cache => {
      return cache.addAll(
        staticAssets.map(url => {
          return new Request(url, { credentials: 'include' });
        })
      );
    });
  }
  function stashInCache(name, request, response) {
    caches.open(name).then(cache => {
      return cache.put(request, response);
    });
  }
  // Limit the number of items in a specified cache.
  function trimCache(name, maxItems) {
    caches.open(name).then(cache => {
      cache.keys().then(keys => {
        if (keys.length > maxItems) {
          cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
        }
      });
    });
  }
  // Remove caches whose name is no longer valid
  function clearOldCaches() {
    return caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => {
            return key.indexOf(version) !== 0;
          })
          .map(key => {
            return caches.delete(key);
          })
      );
    });
  }
  // Events!
  self.addEventListener('message', event => {
    if (event.data.command === 'trimCaches') {
      trimCache(pagesCacheName, 35);
      trimCache(imagesCacheName, 20);
    }
  });
  self.addEventListener('install', event => {
    event.waitUntil(
      updateStaticCache().then(() => {
        return self.skipWaiting();
      })
    );
  });
  self.addEventListener('activate', event => {
    event.waitUntil(
      clearOldCaches().then(() => {
        return self.clients.claim();
      })
    );
  });
  self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    if (url.href.indexOf('https://www.juanvillela.dev') !== 0) return;
    if (request.method !== 'GET') return;
    if (url.href.indexOf('?') !== -1) return;
    if (request.headers.get('Accept').includes('text/html')) {
      event.respondWith(
        fetch(request)
          .then(response => {
            const copy = response.clone();
            if (
              staticAssets.includes(url.pathname) ||
              staticAssets.includes(`${url.pathname}/`)
            ) {
              stashInCache(staticCacheName, request, copy);
            } else {
              stashInCache(pagesCacheName, request, copy);
            }
            return response;
          })
          .catch(() => {
            // CACHE or FALLBACK
            return caches.match(request).then(response => {
              return response || caches.match('/offline/');
            });
          })
      );
      return;
    }
    event.respondWith(
      fetch(request)
        .then(response => {
          if (request.headers.get('Accept').includes('image')) {
            const copy = response.clone();
            stashInCache(imagesCacheName, request, copy);
          }
          return response;
        })
        .catch(() => {
          return caches
            .match(request)
            .then(response => {
              return response;
            })
            .catch(console.error);
        })
    );
  });
})();