// const path = require('path')
// const nodeExternals = require('webpack-node-externals')
// const imageLoaders = require('./webpack.image.loaders.js')

// module.exports = {
//   target: 'node',
//   externals: [nodeExternals()],
//   entry: './index.js',
//   output: {
//     path: path.join(__dirname, '/'),
//     filename: 'server.js',
//     libraryTarget: 'commonjs2'
//   },
//   module: {
//     rules: [{
//       test: /\.js$/,
//       use: {
//         loader: 'babel-loader',
//         options: {
//           presets: [
//             ['env', {
//               'targets': {
//                 'node': 'current'
//               }
//             }]
//           ]
//         }
//       }
//     },
//     ...imageLoaders(false)
//     ]
//   }
// }
