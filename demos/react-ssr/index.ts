const Koa = require('koa');
const Router = require('@koa/router');
const koaNunjucks = require('koa-nunjucks-2');
const koaStatic = require('koa-static');
const initRouter = require('./app/router');
const _path = require('path');
const startDevServer = require('./server.dev.ts');

const app = new Koa();

// 开启热更新服务
if (process.env.NODE_ENV === 'development') {
  startDevServer(app);
}

// 模版引擎
app.use(koaNunjucks({
  ext: 'njk',
  path: _path.join(__dirname, './app/views'),
  nunjucksConfig: {
    trimBlocks: true, // 自动删除换行符
  },
}));

app.use(koaStatic(_path.resolve(__dirname, './build'), {
  maxage: 0, // 浏览器缓存max-age（以毫秒为单位）
  hidden: false, // 允许传输隐藏文件
  defer: true, // 如果为true，则使用后return next()，允许任何下游中间件首先响应。
  gzip: true, // 当客户端支持gzip时，如果存在扩展名为.gz的请求文件，请尝试自动提供文件的gzip压缩版本。默认为true。
}));


// 路由
const router = new Router();
initRouter(router);
app.use(router.routes()).use(router.allowedMethods());
// allowedMethods 返回单独的中间件，以返回允许的header method

app.listen(3001, () => {
  console.log('服务已开启，请打开 http://127.0.0.1:3001');
});