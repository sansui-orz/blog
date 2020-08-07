# 应用缓存与PWA

应用缓存（AppCache）将在chrome85以上删除，在Firefox44以上弃用，Safari在2018年弃用。

至于被弃用的原因是“AppCache无法部分更新，且有些用例会导致安全性以及严重的可用性问题”。

而现在最新版的浏览器基本都已经弃用了`AppCache`，改为采用`Service Worker`管理页面缓存。

AppCache与Service Worker是互斥的，任何用了Service Worker的页面将禁用`AppCache`。所以要从`AppCache`迁移到`Service Worker`务必将所有缓存文件迁移过去，没有被包含在`Service Worker`也是无法使用`AppCache`的。

## 参考资料

[Application Cache 就是个坑](http://zoomzhao.github.io/2012/11/11/application-cache-is-a-douchebag/)

[使用应用缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Using_the_application_cache)

[应用程序缓存](https://www.chromestatus.com/feature/6192449487634432)

[Preparing for AppCache removal](https://web.dev/appcache-removal/)

[渐进式 Web 应用（PWA）](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
