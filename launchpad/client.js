/* global window, document */
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from './configureStore'
import {setCache} from './cache'

export default (AppComponent) => {
  setCache(window.FETCH_CACHE)
  const store = configureStore(createHistory(), window.INITIAL_STATE)

  render(
    <Provider store={store}>
      <AppComponent />
    </Provider>,
    document.getElementById('root')
  ) 
}

if (module.hot) {
	module.hot.accept()
}