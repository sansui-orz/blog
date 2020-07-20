const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const outputPath = path.resolve(__dirname, '../build/client/');
const ENV = process.env.NODE_ENV;
const entry = path.resolve(__dirname, '../web/render/clientRender.tsx');

module.exports = {
  entry: {
    home: [entry],
  },
  output: {
    filename: ENV === 'production' ? '[name].[chunkhash].js' : '[name].js',
    path: outputPath,
    publicPath: '/',
    hashDigestLength: 8,
  },
  plugins: [new ManifestPlugin()].concat(ENV ? [new CleanWebpackPlugin()] : []),
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};