import React from 'react'
import PropTypes from 'prop-types';
import less from './style.less'

const Snackbar = ({ content, onClick }) => (
  <div className={less.snackbar} hidden={!content} onClick={onClick}>
    {content}
  </div>
)

Snackbar.propTypes = {
  content: PropTypes.node,
  onClick: PropTypes.func.isRequired
}

export default Snackbar
