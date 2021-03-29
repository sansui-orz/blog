import * as Koa from 'koa';
import * as Router from '@koa/router';

const koa = require('koa');
const KoaRouter = require('@koa/router');

const app: Koa = new koa();
const koaRouter: Router = new KoaRouter();

require('./src/routers')(koaRouter);

app.use(koaRouter.routes()).listen(3000, () => {
  console.log('server run on: http://127.0.0.1:3000');
});