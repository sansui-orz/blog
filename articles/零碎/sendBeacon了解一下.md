# window.navigator.sendBeacon()

[tag]:记录|js
[create]:2019-10-09

该方法可用于通过HTTP将少量数据传输到Web服务器

## 语法

```javascript
navigator.sendBeacon(url, data);
```

## 参数

- url

网络地址

- data

将要发送的格式，ArrayBufferView或Blob,DOMString或者FormData类型的数据

## 返回值

成功加入传输队列，返回true, 否则false

## 出现的意义

通常我们某些严格一点的项目，会进行一些打点log。

一个重要的场景是当页面卸载时，我们获取会需要将当前用户的一些信息进行打点保存。

通常情况下，我们会在页面的onload或者beforeunload里面将请求发出。

这就可能导致两个问题：

1. 浏览器或许会等待请求发出后再卸载，造成页面卸载延迟。而导致页面切换间造成卡顿

2. 浏览器直接卸载，忽略了该条请求（例如使用图像ping的方式来进行打点），而我们为了确保浏览器确实发出了请求，或许会做出运行一些卡顿代码来阻止浏览器卸载，这就又回到了问题1.

而sendBeacon出现则很好的解决了这个问题，sendBeacon是异步的，不阻塞页面跳转，并且它**不受同域限制**

## 它的缺点

1. 虽然它兼容性很好，但是还是有些低版本或者IE是不支持它的

2. 调用成功返回true只是代表它进入了传输队列，并不能保证请求成功，并且不会有任何返回值

## 注意

由于某些情况下sendBeacon会失败，所以使用该api时应该注意其返回值，当返回值为false使用fetch/xhr兜底。
