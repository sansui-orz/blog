# 使用Media Source Extensions支持视频流播放

[Media Source Extensions](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Source_Extensions_API)提供了实现无插件且基于 Web 的流媒体的功能。

目前前端支持的flv.js/dash.js/hls.js等库均用到了MSE。但是对于MSE的简单使用方法并没有太多相关资料（至少我没有找到）。

最后参考[H5直播系列二 MSE(Media Source Extensions)](https://www.jianshu.com/p/1bfe4470349b), 自己搭建了简单的一个视频流播放（不包含视频转码）。

[源码地址](../demos/video-live/mse)

## 搭建服务端视频流服务

搭建一个node的视频流服务，这里为了简单，不实用任何依赖，直接`node server`跑服务。

文件名：***server.js***

```js
const http = require('http');
const fs = require('fs');

const port = 3001;

const server = http.createServer((req, res) => {
  if (/\.mp4$/.test(req.url)) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/octet-stream');
    const stream = fs.createReadStream(__dirname + '/frag_bunny.mp4');
    stream.pipe(res);
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(fs.readFileSync(__dirname + '/index.html'));
  }
});

server.listen(port, () => {
  console.log('open: http://localhost:' + port);
});
```

可以看到上面的服务很简单，当访问`.mp4`后缀的路由时，流式返回视频流数据。否则返回我们的静态页面。

但是需要注意不是所有mp4文件都可以流式传输给video播放的，使用普通mp4播放会报错，需要使用[fregament mp4](https://blog.csdn.net/lyuan1314/article/details/9289827)格式的视频才行。

这里我直接使用的是[MSE（Media Source Extensions）的一点尝试](https://blog.csdn.net/weixin_41196185/article/details/82229244)内提供的一个[fragament mp4文件](https://raw.githubusercontent.com/nickdesaulniers/netfix/gh-pages/demo/frag_bunny.mp4)。

通过

```js
res.setHeader('Content-Type', 'application/octet-stream');
const stream = fs.createReadStream(__dirname + '/frag_bunny.mp4');
stream.pipe(res);
```

简单将该mp4视频流下发。

紧接着开始写播放页面。

文件名 ***index.html***

```html
<!-- 省略 -->
<body>
 <video id="video">
 <script>
 </script>
</body>
<!-- 省略 -->
```
