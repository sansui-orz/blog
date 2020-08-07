const cacheName = 'pwa2-v1';

const appShellFiles = [
  '/blog/demos/pwa2/css/index.css',
  '/blog/demos/pwa2/js/index.js',
  '/blog/demos/pwa2/manifest.json'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil( // 需要等到service work安装完成
    // caches是一个特殊的CacheStorage对象
    caches.open(cacheName).then(function(cache) { // 指定cachename创建缓存
      return cache.addAll(appShellFiles); // 将需要缓存的资源列表加进缓存
    })
  )
});

self.addEventListener('fetch', function(e) { // 监听资源请求
  e.respondWith( // 拦截资源请求
    caches.match(e.request).then(function(r) { // 匹配离线资源
      return r || fetch(e.request).then(function(response) { // 如果离线资源不存在，则发出资源请求
        return caches.open(cacheName).then(function(cache) { // 将获取到的资源缓存起来
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  )
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) { // 用来清除不需要的缓存
      return Promise.all(keyList.map(function(key) {
        if (cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

