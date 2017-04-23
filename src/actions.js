import {createAction} from '../launchpad'
import {fetchUsers, fetchUser, fetchKey} from './api'

export const getKey = createAction('GET_TEST_KEY', {
  async: ({key}) => fetchKey(key),
  handler: (state, {payload}) => ({
    ...state,
    reply: payload.reply
  }),
  initialState: {reply: 'No key yet'}
})

export const getUsers = createAction('GET_USERS', {
  async: fetchUsers,
  handler: (state, {payload: list}) => ({
    ...state,
    list: list.map((user) => ({name: user.name, id: user.id}))
  }),
  initialState: {list: []}
})

export const getUser = createAction('GET_USER', {
  async: ({id}) => fetchUser(id),
  handler: (state, {payload: user}) => ({
    ...state,
    user
  })
})
