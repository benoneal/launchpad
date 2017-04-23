# Launchpad

A production-ready starter kit for modern universal apps developed to solve the problems of an actual production application. 

- Server-side rendering
- React view
- Custom redux-based router
- Express server
- CSS-in-JS hooks (library agnostic)
- Client and server caching of data and rendered html
- Both client and server are Webpack 2 bundled
- Full ES2017 support throughout project
- Hot reloading in development
- Images, including opt-in inlined SVGs
- Favicon generation
- Full control of rendered html through `react-helmet`
- CSRF security on all internal api requests
- BelowTheFold component for ssr optimization

Launchpad has no opinion/implementation for: 

- Linting
- Standard CSS
- Testing

## Getting started

Development: 

``` javascript
git clone git@github.com:benoneal/launchpad.git
cd launchpad
yarn
npm run dev
```
Visit at [localhost:3000](http://localhost:3000)

Production: 

``` javascript
npm run build:prod
npm start
```
Visit at [localhost:3000](http://localhost:3000)

### Store API

The custom redux store (which the router integrates with) exposes a simple `createAction` method, which drastically reduces boilerplate, and allows you to partition your business logic however you wish. 

``` javascript
// actions.js
import {createAction} from '../launchpad'
import {fetchUsers, fetchUser} from './api'

export const getUsers = createAction('GET_USERS', {
  initialState: {users: []}, // all initialState props are merged into the store initialState
  async: () => fetchUsers(), // return a promise that resolves to the payload you want passed to your handler
  handler: (state, {payload: users}) => ({ // a standard reducer to return the new app state
    ...state, 
    users: users.map(({id, name}) => ({id, name}))
  })
})

export const getUser = createAction('GET_USER', { // all constants are made available via import {constants} from '../launchpad'
  async: ({id}) => fetchUser(id), // omit the async key for a synchronous action that passes its payload directly to the handler
  handler: (state, {payload: user}) => ({
    ...state, 
    user
  })
})
```

### Router API

The custom router is both powerful and incredibly simple. It handles status codes, data fetching, not-found routes, and redirects, on both client and server. 

Setting up your app routes is trivial: 
``` javascript
// routes.js
import {routeFragment, routeRedirect} from '../launchpad'
import {getUsers, getUser} from './actions

// redirect from /user or /user/ to the app root (trailing slashes are normalised)
routeRedirect('/user', '/') 

// redirect from /key or /key/ to /key/12345
routeRedirect('/key', '/key/12345')

// Create a react component that will only display its children when the route matches the root
export const HomeRoute = routeFragment('/')

// Create a react component that will only display its children when the route matches /users
// On transitioning to this route, on either client or server, the getUsers action will be fired and resolved before transitioning/serving the page
export const UsersRoute = routeFragment('/users', getUsers)

// Same as UsersRoute, but the value of the route :id param will be passed to the getUser action
export const UserRoute = routeFragment('/user/:id', getUser)

// Create a react component that will only display its children when the status code is 404 (no matched route)
export const NotFoundRoute = routeFragment(404)

// Same as NotFoundRoute, but for valid routes where there was an error while fetching the data
export const DataErrorRoute = routeFragment(500)
```

The above `routes.js` file is all you need. It both registers your apps routes with the router, and exports view components for route matches. 