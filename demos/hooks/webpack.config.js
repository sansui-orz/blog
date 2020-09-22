const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = (env = {}) => {
  const options = {
    mode: env.production ? 'production' : 'development',
    entry: path.resolve(__dirname, './app/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'hooks-reducer.[chunkhash:6].js',
      chunkFilename: 'common.[chunkhash:6].js'
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: 'ts-loader' },
        { test: /\.js$/, use: 'babel-loader'},
        { test: /\.css$/, use: ['style-loader', 'css-loader']}
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
    },
    plugins: [new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    })]
  };

  if (!env.production) {
    options.devServer = {
      contentBase: path.resolve(__dirname, 'dist'),
      compress: true,
      open: true,
      port: 3002
    };
  } else {
    options.optimization = {
      splitChunks: {
        chunks: 'all'
      }
    };

    options.plugins.push(
      new CleanWebpackPlugin(),
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 8
        }
      }),
      new BundleAnalyzerPlugin()
    );
  }
  return options;
};