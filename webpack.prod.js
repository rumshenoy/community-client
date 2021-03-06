const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [

    // Clear dist directory before building for production
    new CleanWebpackPlugin(['dist']),

    // generates html file with all webpack bundles included in script tag
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/static/images/favicon.png'),
      inject: 'body'
    }),

    //prevents webpack CLI from stopping due to errors
    new webpack.NoEmitOnErrorsPlugin(),

    //improve logging in the console
    new webpack.NamedModulesPlugin(),

    // passes variables from webpack to js files
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      warnings: false,
      mangle: true,
      compress: {
        drop_console: true
      }
    }),

    // Copy static files to dist directory
    new CopyWebpackPlugin([
      { from: 'src/static', to: 'static' },
      { from: 'login', to: 'login' },
    ]),

  ],
  externals: {
    config: JSON.stringify(require("./src/config/config.js"))
  }
});
