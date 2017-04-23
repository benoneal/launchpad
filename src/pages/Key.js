import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import imgSrc from '../../assets/scarlet_wake_catch.png'

const Key = ({
  reply
}) => (
  <div>
    <Helmet title={`Key ${reply.split(': ')[1]}`} />
    <h2>{reply}</h2>
    <img src={imgSrc} height={500}/>
  </div>
)

const mapStateToProps = ({reply}) => ({
  reply
})

export default connect(mapStateToProps)(Key)
