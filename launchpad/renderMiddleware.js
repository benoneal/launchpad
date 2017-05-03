import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import Helmet from 'react-helmet'
import {Provider} from 'react-redux'
import createHistory from 'history/createMemoryHistory'
import Root from './Root'
import configureStore from './configureStore'
import {resolveLocation} from './router'
import {getCache, fetchData, cacheData} from './cache'

const renderCache = {}

const renderHtml = ({AppComponent, store, bundle, baseCss, cssToString}) => {
  const body = renderToString(
    <Provider store={store}>
      <AppComponent />
    </Provider>
  )

  const rootMarkup = renderToStaticMarkup(
    <Root 
      head={Helmet.renderStatic()}
      content={body}
      baseStyles={baseCss}
      renderJSStyles={cssToString}
      fetchCache={getCache()}
      initialState={store.getState()}
      bundle={bundle}
    />
  )

  return `<!doctype html>\n${rootMarkup}`
}

const resolveRoute = ({path, res, cachePerUrl = true, ...config}) => {
  if (cachePerUrl) {
    const cachedHtml = fetchData(renderCache, path)
    if (cachedHtml) return res.status(200).send(cachedHtml)
  }
  resolveLocation(path, config.store.dispatch)
    .then(({status, url}) => {
      if (url) {
        return res.redirect(status, url)
      }
      const html = renderHtml(config)
      cachePerUrl && cacheData(renderCache, 8 * 60, path, html, typeof html)
      res.status(status).send(html)
    })
}

export default (config) => (req, res) => {
  const history = createHistory({
    initialEntries: [req.url]
  })
  resolveRoute({...config, path: req.url, res, store: configureStore(history)})
}
