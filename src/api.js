import {cachedGet, get} from 'fenris'
import config from '../config'

const BASE_URL = config.app_url

export const fetchUsers = () => cachedGet('http://jsonplaceholder.typicode.com/users')

export const fetchUser = (id) => cachedGet(`http://jsonplaceholder.typicode.com/users/${id}`)

export const fetchKey = (key) => cachedGet(`${BASE_URL}/api/key/${key}`)
