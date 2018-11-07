const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: [
      'vue'
    ]
  }, // 入口文件地址
  output: {
    filename: '[name].[chunkhash].js', // 输出的文件名
    path: path.resolve(__dirname, 'dist') // 输出路径
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ // 生成构建html的模版
      template: './index.html' // 指定模版路径 
    }),
    new VueLoaderPlugin() // vue解析所需要的插件
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // 指定loader解析css文件
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
      },
      {
        test: /\.vue$/, // 指定loader解析vue文件
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': ['vue-style-loader', 'css-loader', 'sass-loader'],
            'sass': ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
          }
        }
      },
      {
        test: /\.js$/, // 指定babel进行js转码
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }],
        exclude: /node_modules/
      },
      { // 指定引用文件loader
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
};