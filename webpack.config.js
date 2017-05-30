var path = require('path');
var webpack = require('webpack');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');

var autoprefixerBrowsers = ['last 2 versions', '> 1%', 'opera 12.1', 'bb 10', 'android 4'];

module.exports = {
  entry: path.join(__dirname, 'client/scripts/application.js'),
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
    publicPath: "http://localhost:8080/",
  },
  devtool: 'source-map',
          // exclude: /node_modules/,
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
          test: /\.less$/, // import css from 'foo.less';
          use: [
              'style-loader',
              'css-loader',
              'less-loader'
          ]
      },
      {
          test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
};
