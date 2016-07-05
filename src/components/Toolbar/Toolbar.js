import React, { PropTypes } from 'react'
import less from './style.less'
import IconButton from '../IconButton'
import Icon from '../Icon'

const getResizeIcon = (active) =>
  (`zoom_${active ? 'out' : 'in'}`)

const Toolbar = ({ hidden, onEnter, onLeave, btnState, actions }) => (
  <div
    className={less.toolbar}
    hidden={hidden}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    onFocus={onEnter}
    onBlur={onLeave}
  >
    <div className={less.content}>
      <IconButton
        title="リサイズ(R)"
        onClick={actions.onResizeClick}
      >{getResizeIcon(btnState.resize)}</IconButton>
      <IconButton
        title="ヘルプを表示(?)"
        onClick={actions.onHelpClick}
      >help</IconButton>
    </div>
    <div className={less.grip}><Icon>more_vert</Icon></div>
  </div>
)

Toolbar.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onEnter: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  btnState: PropTypes.shape({
    resize: PropTypes.bool.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    onResizeClick: PropTypes.func.isRequired,
    onHelpClick: PropTypes.func.isRequired
  }).isRequired
}

export default Toolbar
