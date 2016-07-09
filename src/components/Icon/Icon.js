import React, { PropTypes } from 'react'
import less from './style.less'

const Icon = ({ children }) => (
  <span className={less.icon}>{children}</span>
)

Icon.propTypes = {
  children: PropTypes.string
}


export default Icon
