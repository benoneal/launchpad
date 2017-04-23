import config from './webpack.config.js'
import serve from './src/server'

serve(process.env.PORT, config[0])
