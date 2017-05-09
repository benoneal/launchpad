import React from 'react'
import Helmet from 'react-helmet'
import {Link} from 'fenris'
import Home from './pages/Home'
import User from './pages/User'
import Key from './pages/Key'
import NoMatch from './components/NoMatch'
import {HomeRoute, UserRoute, KeyRoute, NotFoundRoute} from './routes' 

const App = ({ children }) => (
  <div>
    <Helmet
      title="My App"
      titleTemplate="%s - My App"
      meta={[
        { 'char-set': 'utf-8' },
        { name: 'description', content: 'My super dooper dope app' },
      ]}
    />
    <nav>
      <ul>
        <li><Link to="/" prefetchData>Users</Link></li>
        <li><Link to={`/key/${Math.floor(Math.random() * (10000 - 1)) + 1}`} prefetchData>Key</Link></li>
      </ul>
    </nav>
    <HomeRoute><Home /></HomeRoute>
    <UserRoute><User /></UserRoute>
    <KeyRoute><Key /></KeyRoute>
    <NotFoundRoute><NoMatch /></NotFoundRoute>
  </div>
)

export default App
