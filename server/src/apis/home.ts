import * as Koa from 'koa';

const fsPromises = require('fs').promises;
const path = require('path');

module.exports = async function (ctx: Koa.Context) {
  ctx.set('Content-Type', 'text/html');
  ctx.body = await fsPromises.readFile(path.resolve(__dirname, '../../public/home.html'));
};