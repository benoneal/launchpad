/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux'
import compact from 'lodash/compact'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import router from './router'
import reducer from './store'

const clientDev = typeof document !== 'undefined' && process.env.NODE_ENV !== 'production'

export default (history, initialState) => {
  const middleware = compact([thunk, router(history), clientDev && logger])
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

  const store = createStoreWithMiddleware(reducer, initialState)

  if (clientDev && module.hot) {
    module.hot.accept('./store', () => {
      const nextRootReducer = require('./store').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
