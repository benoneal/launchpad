import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import UserCard from '../components/UserCard'

const User = ({
  user
}) => (
  <div>
    <Helmet
      title={user.name || ''}
      meta={[
        { name: 'description', content: 'User Profile' },
      ]}
    />
    <UserCard user={user} />
  </div>
)

const mapStateToProps = ({user}) => ({
  user
})

export default connect(mapStateToProps)(User)
