import React from 'react'
import PropTypes from 'prop-types';
import less from './style.less'

const Icon = ({ children }) => (
  <span className={less.icon}>{children}</span>
)

Icon.propTypes = {
  children: PropTypes.string
}


export default Icon
