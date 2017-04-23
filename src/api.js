import {cachedGet, get} from '../launchpad'
import config from '../config'

// TODO: Fix this nonsense somehow?
// Necessary for server-side fetches from internal api for some reason
const BASE_URL = config.app_url

export const fetchUsers = () => cachedGet('http://jsonplaceholder.typicode.com/users')

export const fetchUser = (id) => cachedGet(`http://jsonplaceholder.typicode.com/users/${id}`)

export const fetchKey = (key) => cachedGet(`${BASE_URL}/api/key/${key}`)
