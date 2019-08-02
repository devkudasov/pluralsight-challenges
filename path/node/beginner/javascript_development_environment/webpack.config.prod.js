import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug   : true,
  devtools: 'source-map',
  inInfo  : false,
  entry   : {
    main  : path.resolve(__dirname, 'src/index'),
    vendor: path.resolve(__dirname, 'src/vendor')
  },
  target  : 'web',
  output  : {
    path      : path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename  : '[name].[chunkhash].js'
  },
  plugins : [
    new ExtractTextPlugin('[name].[contenthash].css'),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject  : true,
      minify  : {
        removeComments               : true,
        removeStyleLinkTypeAttributes: true,
        removeEmptyAttributes        : true,
        removeRedundantAttributes    : true,
        keepClosingSlash             : true,
        useShortDoctype              : true,
        collapseWhitespace           : true,
        minifyURLs                   : true,
        minifyCSS                    : true,
        minifyJS                     : true
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module  : {
    loaders: [
      { test: /\.js$/, exculde: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') }
    ]
  }
};
