import path from 'path';
import webpack from 'webpack';

export default {
  debug: true,
  devtools: 'source-map',
  inInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  terget: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, exculde: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loaders: ['style', 'css'] }
    ]
  }
};
