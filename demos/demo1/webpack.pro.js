const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist/*']),
    new webpack.HashedModuleIdsPlugin(),
    new UglifyJSPlugin({ // 启用代码压缩
      sourceMap: true
    }),
    new webpack.DefinePlugin({ // 指定当前环境，防止某些库会用到这个参数
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});