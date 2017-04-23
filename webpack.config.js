const path = require('path')
const webpack = require('webpack')
const MinifierPlugin = require('babili-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const faviconConfig = require('./favicon.config.js')
const babelConfig = require('./babelrc.js')
const appConfig = require('./config')

const DIST = path.join(__dirname, 'dist')
const PRODUCTION = process.env.NODE_ENV === 'production'

const filterFalsy = (arr) => arr.filter(e => e)
const plugins = filterFalsy([
  new webpack.optimize.OccurrenceOrderPlugin(),
  !PRODUCTION && new webpack.HotModuleReplacementPlugin(),
  !PRODUCTION && new webpack.NamedModulesPlugin(),
  !PRODUCTION && new webpack.NoEmitOnErrorsPlugin(),
  PRODUCTION && new MinifierPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }
  })
])

const loaders = (config) => [
  {
    test: /\.js?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: babelConfig(config),
  },
  {
    test: /\.(jpg|png)/,
    loader: 'file-loader'
  },
  {
    test: /\.svg/,
    exclude: /src/,
    loader: 'file-loader'
  },
  {
    test: /\.svg/,
    exclude: /assets/,
    loader: 'raw-loader'
  }
]

const clientConfig = {
  target: 'web',
  devtool: PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',
  entry: filterFalsy([
    !PRODUCTION && 'react-hot-loader/patch',
    !PRODUCTION && `webpack-hot-middleware/client`,
    './src/index.js',
  ]),
  output: {
    path: DIST,
    filename: PRODUCTION ? 'app.min.js' : 'app.js',
    publicPath: '/'
  },
  plugins: plugins.concat(new FaviconsWebpackPlugin(faviconConfig)),
  module: {
    rules: loaders()
  }
}

const serverConfig = {
  target: 'node',
  devtool: 'source-map',
  node: {
    __dirname: true
  },
  externals: [nodeExternals({
    whitelist: PRODUCTION ? [ 'react', 'react-dom/server' ] : []
  })],
  entry: './index.js',
  output: {
    path: DIST,
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  plugins: plugins.concat(new webpack.BannerPlugin({
    banner: 'require("source-map-support").install();',
    raw: true,
    entryOnly: false,
  })),
  module: {
    rules: loaders({server: true})
  }
}

module.exports = [clientConfig, serverConfig]