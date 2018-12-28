const path = require('path');

module.exports = {
  entry: './src/ui/index.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
