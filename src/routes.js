import {routeFragment, routeRedirect} from 'fenris'
import {
  getUser,
  getUsers,
  getKey
} from './actions'

routeRedirect('/user', '/')
routeRedirect('/key', '/key/12345')

export const HomeRoute = routeFragment('/', getUsers)
export const UserRoute = routeFragment('/user/:id', getUser)
export const KeyRoute = routeFragment('/key/:key', getKey)
export const NotFoundRoute = routeFragment(404)
