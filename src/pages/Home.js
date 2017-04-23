import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import UserList from '../components/UserList'

const Home = ({
  list
}) => (
  <div>
    <Helmet title="Home" />
    <UserList users={list} />
  </div>
)

const mapStateToProps = ({list}) => ({
  list
})

export default connect(mapStateToProps)(Home)
