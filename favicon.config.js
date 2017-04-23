module.exports = {
  logo: './favicon.png',
  title: require('./package.json').title,
  prefix: './',
  emitStats: false,
  statsFilename: 'faviconManifest.json',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: true,
    twitter: true,
    yandex: false,
    windows: true
  }
}