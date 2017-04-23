import launchServer, {getEndpoint} from '../launchpad/server'
import App from './App'

getEndpoint('/test/:key', ({key}) => (
  Promise.resolve({reply: `Your key was: ${key}`})
))

export default (port, config) => {
  launchServer(App, port, config)
}
