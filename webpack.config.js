var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'client/scripts/application.js'),
  output: { path: path.join(__dirname, 'public/js'), filename: 'bundle.js' },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
};
