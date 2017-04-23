const PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  app_url: PRODUCTION ? 'http://localhost:3000' : 'http://localhost:3000'
}