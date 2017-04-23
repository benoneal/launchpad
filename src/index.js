import launchClient from '../launchpad'
import App from './App'

launchClient(App)

if (module.hot) module.hot.accept('./App', () => launchClient(App))
  