// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const outputPath = path.resolve(__dirname, '../build/client/');

module.exports = (env, argv) => {
  const plugins = [
    new ManifestPlugin()
  ];
  if (argv.mode === 'production') {
    plugins.push(new CleanWebpackPlugin());
  } else {
    plugins.push(
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    );
  }
  return {
    entry: {
      home: path.resolve(__dirname, '../web/render/clientRender.tsx'),
    },
    output: {
      filename: argv.mode === 'production' ? '[name].[chunkhash].js' : '[name].js',
      path: outputPath,
      publicPath: '/',
      hashDigestLength: 8,
    },
    plugins,
    // devServer: {
    //   contentBase: outputPath,
    //   inline: true,
    //   compress: true,
    //   hot: true,
    //   port: 8001,
    // },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  };
};