import launchServer, {getEndpoint} from 'fenris/dist/server'
import AppComponent from './App'

getEndpoint('/api/key/:key', ({key}) => (
  Promise.resolve({reply: `Your key was: ${key}`})
))

export default (port, config) => {
  launchServer({AppComponent, port, config})
}
