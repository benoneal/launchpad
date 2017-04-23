module.exports = [
  {
    test: /\.(jpg|png)/,
    loader: 'file-loader'
  },
  {
    test: /\.svg/,
    exclude: /src/,
    loader: 'file-loader'
  },
  {
    test: /\.svg/,
    exclude: /assets/,
    loader: 'raw-loader'
  }
]