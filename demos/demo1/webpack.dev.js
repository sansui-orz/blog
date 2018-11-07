const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // 指定当前环境，支持参数development, production, none会对应开启一些优化
  devtool: 'inline-source-map', // 加入资源映射，方便在开发阶段进行调试
  devServer: { // 开启开发服务器
    contentBase: './dist'
  }
});