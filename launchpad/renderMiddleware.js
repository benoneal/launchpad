import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import Helmet from 'react-helmet'
import {Provider} from 'react-redux'
import createHistory from 'history/createMemoryHistory'
import Root from './Root'
import configureStore from './configureStore'
import {resolveLocation} from './router'
import {getCache, fetchData, cacheData} from './cache'

const renderCache = {}

const renderHtml = (AppComponent, store) => {
  const body = renderToStaticMarkup(
    <Provider store={store}>
      <AppComponent />
    </Provider>
  )

  const rootMarkup = renderToStaticMarkup(
    <Root 
      head={Helmet.renderStatic()}
      content={body}
      fetchCache={getCache()}
      initialState={store.getState()}
    />
  )

  return `<!doctype html>\n${rootMarkup}`
}

const resolveRoute = (AppComponent, path, res, store) => {
  const cachedHtml = fetchData(renderCache, path)
  if (cachedHtml) return res.status(200).send(cachedHtml)
  resolveLocation(path, store.dispatch)
    .then(({status, url}) => {
      if (url) {
        return res.redirect(status, url)
      }
      const html = renderHtml(AppComponent, store)
      cacheData(renderCache, 8 * 60, path, html, typeof html)
      res.status(status).send(html)
    })
}

export default (AppComponent) => (req, res) => {
  const history = createHistory({
    initialEntries: [req.url]
  })
  resolveRoute(AppComponent, req.url, res, configureStore(history))
}
