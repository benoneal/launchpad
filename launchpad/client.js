/* global window, document */
import React from 'react'
import {render} from 'react-dom'
import {AppContainer as HotLoader} from 'react-hot-loader'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from './configureStore'
import {setCache} from './cache'

const isClient = typeof window !== 'undefined'
const rehydrate = (key) => (
  isClient ? window[key] : {}
)

isClient && setCache(rehydrate('FETCH_CACHE'))
const store = isClient && configureStore(createHistory(), rehydrate('INITIAL_STATE'))

export default (AppComponent) => {
  render(
    <HotLoader>
      <Provider store={store}>
        <AppComponent />
      </Provider>
    </HotLoader>,
    document.getElementById('root')
  ) 
}
