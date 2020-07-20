const { merge } = require('webpack-merge');
const serverConfig = require('./webpack.server.js');
const clientConfig = require('./webpack.client.js');

const commonConfig = {
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      },
    ]
  },
};

module.exports = [
  merge(commonConfig, clientConfig),
  merge(commonConfig, serverConfig),
];


