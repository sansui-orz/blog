import * as Koa from 'koa';

module.exports = async function (ctx: Koa.Context) {
  console.log(1, ctx.query);
  ctx.body = {
    success: true,
    code: 200,
    msg: 'this is a msg.'
  };
};