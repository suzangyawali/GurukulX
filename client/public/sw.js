// GurukulX LMS - Service Worker
// Provides PWA compliance, offline support, and better cache strategies

const CACHE_NAME = "gurukulx-lms-v2";
const urlsToCache = [
  "/",                  // Root
  "/index.html",        // Main HTML
  "/manifest.json",     // Manifest
  "/favicon.ico",       // App icon
  "/static/js/bundle.js",
  "/static/css/main.css"
];

// ✅ Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((err) => console.error("SW: Install failed", err))
  );
  self.skipWaiting(); // Activate immediately
});

// ✅ Activate event - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("SW: Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ✅ Fetch event - cache-first for static, network-first for APIs
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Network-first for API calls
  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Save fresh copy in cache
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(request)) // fallback to cache if offline
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(request).then((networkResponse) => {
          // Cache new files on the fly
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    }).catch(() => {
      // Fallback offline page (optional)
      if (request.destination === "document") {
        return caches.match("/index.html");
      }
    })
  );
});
