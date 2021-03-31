import * as Koa from 'koa';

module.exports = async function (ctx: Koa.Context) {
  ctx.body = {
    success: true,
    code: 200
  };
};