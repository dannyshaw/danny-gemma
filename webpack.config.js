const webpack = require('webpack');
const config = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

config.devtool = 'cheap-module-source-map';
config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
	  compress: {
	    warnings: false,
	    screw_ie8: true
	  },
	  comments: false,
	  sourceMap: false
	}),
  new ExtractTextPlugin("styles.css"),
  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
    	discardComments: {
    		removeAll: true
    	}
    },
  }),
];

const lessLoader = config.module.rules[3];
lessLoader.use = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'less-loader'],
})
config.module.rules[3] = lessLoader;

module.exports = config

