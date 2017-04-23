import {cachedGet, get} from '../launchpad'

// TODO: Fix this nonsense somehow
const BASE_URL = 'http://localhost:5000'

export const fetchUsers = () => cachedGet('http://jsonplaceholder.typicode.com/users')

export const fetchUser = (id) => cachedGet(`http://jsonplaceholder.typicode.com/users/${id}`)

export const fetchKey = (key) => cachedGet(`${BASE_URL}/test/${key}`)
