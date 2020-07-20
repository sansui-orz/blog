const path = require('path');
const ENV = process.env.NODE_ENV;
const entry = path.resolve(__dirname, '../web/render/serverRender.tsx');

const serverConfig = {
  target: 'node',
  entry: {
    home: [entry],// ENV === 'production' ? entry : [entry, 'webpack-hot-middleware/client'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build/server'),
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
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

module.exports = serverConfig;