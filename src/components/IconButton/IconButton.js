import React, { PropTypes } from 'react'
import less from './style.less'
import Icon from '../Icon'

const getClassName = (active) =>
  `${less.btn} ${active ? 'active' : ''}`

const IconButton = (props) => {
  const { active, children, ...rest } = props
  return (
    <button
      className={getClassName(active)}
      {...rest}
    ><Icon>{children}</Icon></button>
  )
}

IconButton.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.string
}

export default IconButton
