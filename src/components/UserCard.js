import React from 'react'

const UserCard = ({user}) => (
  <ul>
    <li>Name: {user.name}</li>
    <li>Username: {user.username}</li>
    <li>Email: {user.email}</li>
    <li>Phone: {user.phone}</li>
    <li>Website: {user.website}</li>
  </ul>
)
export default UserCard
