import * as Koa from 'koa';
import { execSync } from 'child_process';
const path = require('path');
const cache = require('../utils/cache');
const querystring = require('querystring');
const config = require(path.join(__dirname, '../config/config.default'));
const KEY = 'restart-error-times';

module.exports = async function (ctx: Koa.Context) {
  try {
    const times = cache.get(KEY);
    const params = querystring.parse(ctx.request.url.split('?')[1]);
    if (typeof times == 'number' && times >= 3) { // 一天内重启错误超过3次，则禁止重启
      ctx.res.statusCode = 403;
      console.log('重启失败超过3次', times);
      return;
    } else if (!params || !params.password || params.password !== config.restartPassword) {
      cache.set(KEY, (times || 0) + 1);
      ctx.res.statusCode = 403;
      console.log('密码错误', times);
      return;
    }
    const std = await execSync(`bash ${ path.join(__dirname.split('server')[0], 'server/restart.sh') }`);
    console.log('标准输出', std.toString());
    ctx.body = {
      code: 200,
      msg: '重启成功',
      status: std.toString(),
      success: true
    };
  } catch (err) {
    console.log('运行错误', err);
    ctx.body = {
      success: false,
      msg: '重启失败',
      code: 500
    };
  }
};