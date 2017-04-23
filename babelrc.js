const clientTarget = {browsers: ['> 5%', 'last 2 versions']}
const serverTarget = {targets: {node: 'current'}}

module.exports = ({server} = {}) => ({
  presets: [
    ['env', {
      targets: server ? serverTarget : clientTarget,
      modules: false
    }],
    'react',
    'stage-0'
  ],
  env: {
    development: {
      plugins: [
        'react-hot-loader/babel',
        'babel-plugin-transform-react-jsx-self',
        'babel-plugin-transform-react-jsx-source'
      ]
    }
  }
})