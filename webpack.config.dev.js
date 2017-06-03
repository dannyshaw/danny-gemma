const config = require('./webpack.config');

config.devtool = 'source-map';
config.output.publicPath = 'http://localhost:8080/';

config.devServer = {
  historyApiFallback: true,
  watchOptions: { aggregateTimeout: 300, poll: 1000 },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
};
