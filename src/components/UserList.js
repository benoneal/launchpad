import React from 'react'
import {Link} from 'fenris'

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.id}>
        <Link to={`/user/${user.id}`} prefetchData={Boolean(user.id % 2)}>{user.name}</Link>
      </li>
    ))}
  </ul>
)

export default UserList
