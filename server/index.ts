import * as Koa from 'koa';
import * as Router from '@koa/router';
import * as KoaStatic from 'koa-static';

const koa = require('koa');
const KoaRouter = require('@koa/router');
const koaStatic = require('koa-static');
const path = require('path');

const app: Koa = new koa();
const koaRouter: Router = new KoaRouter();

require('./src/routers')(app, koaRouter);

app
  .use(koaRouter.routes())
  .use(koaStatic(path.join(__dirname, './public'), {
    setHeaders(ctx: Koa.Context, path: string) {
      // 文章直接走静态代理
      if (/.+\/article\/[a-z0-9]+$/.test(path)) {
        ctx.setHeader('Content-Type', 'text/html');
      }
    }
  }))
  .use(async (ctx: Koa.Context, next: Koa.Next) => {
    next();
    if (ctx.status === 404) {
      ctx.redirect('/');
    }
  })
  .listen(3011, () => {
    console.log('server run on: http://127.0.0.1:3011');
  });