/* globals ENVIRONMENT */
import React from 'react'

const dehydrate = (data, key) => (
  <script dangerouslySetInnerHTML={{__html: `window.${key} = ${data}`}} />
)

const Root = ({
  head,
  baseStyles,
  renderJSStyles,
  content,
  fetchCache,
  initialState,
  bundle
}) => (
  <html {...head.htmlAttributes.toComponent()}>
    <head>
      {head.title.toComponent()}
      {head.meta.toComponent()}
      {head.link.toComponent()}
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={head.title.toString()} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#fff" />
      <meta name="application-name" content={head.title.toString()} />
      <meta name="msapplication-TileColor" content="#fff" />
      <meta name="msapplication-TileImage" content="mstile-144x144.png" />
      <meta name="msapplication-config" content="browserconfig.xml" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="shortcut icon" href="/favicon.ico" />
      {baseStyles && <style dangerouslySetInnerHTML={{__html: baseStyles}} />}
      {renderJSStyles && <style id="stylesheet" dangerouslySetInnerHTML={{__html: renderJSStyles()}} />}
    </head>
    <body {...head.bodyAttributes.toComponent()}>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      {dehydrate(`'${ENVIRONMENT}'`, 'ENVIRONMENT')}
      {initialState && dehydrate(JSON.stringify(initialState), 'INITIAL_STATE')}
      {fetchCache && dehydrate(JSON.stringify(fetchCache), 'FETCH_CACHE')}
      {head.script.toComponent()}
      <script src={'/' + bundle} />
    </body>
  </html>
)

export default Root
