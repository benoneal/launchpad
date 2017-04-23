const path = require('path')
const webpack = require('webpack')
const imageLoaders = require('./webpack.image.loaders.js')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const faviconConfig = require('./favicon.config.js')

module.exports = {
  devtool: '#source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new FaviconsWebpackPlugin(faviconConfig),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        plugins: [
          ['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module'],
            }],
          }],
        ],
      },
    },
    ...imageLoaders
    ],
  },
}
