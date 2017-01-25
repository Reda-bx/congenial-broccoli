var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/overlay.js',
  output: { path: __dirname + '/js', filename: 'overlay.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};
