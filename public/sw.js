const CACHE_PREFIX = "info-fusion-cache-v-";
let CURRENT_CACHE = null;

const ensureCache = async (name) => {
  await caches.open(name);
  CURRENT_CACHE = name;
  return name;
};

const getCurrentCacheName = async () => {
  if (CURRENT_CACHE) return CURRENT_CACHE;

  const keys = await caches.keys();
  const newest = keys.filter((name) => name.startsWith(CACHE_PREFIX)).at(-1);

  if (newest) {
    CURRENT_CACHE = newest;
    return newest;
  }

  return ensureCache(`${CACHE_PREFIX}default`);
};

async function generateCacheName(request, event) {
  event.respondWith(
    (async () => {
      let version = "default";

      try {
        const response = await fetch(request, { cache: "no-store" });
        version = response.ok ? String(await response.json()) : "default";
      } catch {
        version = "default";
      }

      const cacheName = CACHE_PREFIX + version;
      const cacheNames = await caches.keys();

      if (!cacheNames.includes(cacheName)) {
        await ensureCache(cacheName);
      } else {
        CURRENT_CACHE = cacheName;
      }

      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith(CACHE_PREFIX) && name !== cacheName)
          .map((name) => caches.delete(name)),
      );

      return new Response(null, { status: 200, statusText: "OK" });
    })(),
  );
}

const cacheClone = async (event) => {
  const response = await fetch(event.request);
  const responseClone = response.clone();

  const cache = await caches.open(await getCurrentCacheName());
  await cache.put(event.request, responseClone);

  return response;
};

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", async (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.pathname.includes("cache-version")) {
    return generateCacheName(request, event);
  }

  if (request.method !== "GET" || url.origin !== location.origin) {
    return;
  }

  if (url.pathname.includes("061e9a443b5d")) {
    return;
  }

  const isDocument = request.mode === "navigate" || request.destination === "document";
  const isNextPrefetch =
    request.headers.get("Next-Router-Prefetch") === "1" ||
    url.searchParams.has("rsc") ||
    url.searchParams.has("_rsc");

  if (isDocument || isNextPrefetch) {
    return;
  }

  event.respondWith(cacheClone(event).catch(() => caches.match(event.request)));
});
