const path = require('path')
const webpack = require('webpack')
const imageLoaders = require('./webpack.image.loaders.js')
const del = require('del')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const faviconConfig = require('./favicon.config.js')

class CleanPlugin {
  constructor(options) {
    this.options = options
  }

  apply() {
    del.sync(this.options.files)
  }
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.min.js',
    publicPath: '/',
  },
  plugins: [
    new FaviconsWebpackPlugin(faviconConfig),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanPlugin({
      files: ['dist/*'],
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    ...imageLoaders
    ],
  },
}
