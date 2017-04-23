const PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  app_url: PRODUCTION ? 'http://app.url' : 'http://localhost:3000'
}