/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import router from './router'
import reducer from './store'

const clientDev = typeof document !== 'undefined' && process.env.NODE_ENV !== 'production'

export default (history, initialState) => {
  const middleware = [thunk, router(history), clientDev && logger].filter(x => x)
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

  const store = createStoreWithMiddleware(...[
    reducer, 
    initialState, 
    clientDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ].filter(x => x))

  if (clientDev && module.hot) {
    module.hot.accept('./store', () => {
      const nextRootReducer = require('./store').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
