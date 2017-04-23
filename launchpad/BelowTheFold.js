import React from 'react'

const isServer = typeof process === 'object' && Object.prototype.toString.call(process) === '[object process]'

const BelowTheFold = ({children}) => !isServer && (
  <div>{children}</div>
)

export default BelowTheFold