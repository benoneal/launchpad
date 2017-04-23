/* global window, document */
import React from 'react'
import {render} from 'react-dom'
import {AppContainer as HotLoader} from 'react-hot-loader'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from './configureStore'
import {setCache} from './cache'

setCache(window.FETCH_CACHE)
const store = configureStore(createHistory(), window.INITIAL_STATE)

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
