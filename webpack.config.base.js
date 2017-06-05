var path = require('path');
var webpack = require('webpack');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');


var autoprefixerBrowsers = ['last 2 versions', '> 1%', 'opera 12.1', 'bb 10', 'android 4'];

module.exports = {
  entry: path.join(__dirname, 'client/scripts/application.js'),
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: /node_modules/,
      },
      {
          test: /\.(png|gif)$/,
          loader: 'url-loader?limit=1024&name=[name]-[hash:8].[ext]!image-webpack-loader'
      },
      {
          test: /\.jpg$/,
          loader: 'file-loader'
      },
      {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ],
      },
      {
          test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader'
      }
    ]
  },
};
