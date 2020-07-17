const path = require('path');

const serverConfig = {
  target: 'node',
  entry: {
    home: path.resolve(__dirname, '../web/render/serverRender.tsx'),
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
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // }
};

module.exports = serverConfig;