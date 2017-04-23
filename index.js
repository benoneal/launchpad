require('babel-core/register')
const devConfig = require('./webpack.config.js')
const prodConfig = require('./webpack.production.config.js')

const noop = () => {} // TODO: Fix this nonsense somehow. 
require.extensions['.png'] = noop
require.extensions['.jpg'] = noop
require.extensions['.jpeg'] = noop
require.extensions['.woff'] = noop
require.extensions['.woff2'] = noop
require.extensions['.ico'] = noop
require.extensions['.svg'] = noop

const serve = require('./src/server').default

serve(5000, process.env.NODE_ENV !== 'production' ? devConfig : prodConfig)
