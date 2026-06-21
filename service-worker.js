const CACHE_NAME = "gascalc-cache-v3";

// 新しいSWを即時有効化
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// 古いキャッシュを全削除して最新に切り替え
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// 常にネットワーク優先（最新を取りに行く）
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => response)
      .catch(() => caches.match(event.request))
  );
});
