import React, { PropTypes } from 'react'
import less from './style.less'
import Profile from '../Profile'
import Toolbar from '../Toolbar'
import Icon from '../Icon'

const getButtonClass = (active) =>
  (`${less.switch} ${active ? less.active : ''}`)
const getButtonTitle = (hidden) =>
  (`サイドパネルを${hidden ? '展開する' : '折りたたむ'}(T)`)

const SidePanel = ({ hidden, onSwitchClick }) => (
  <div className={less.panel} hidden={hidden}>
    <button
      className={getButtonClass(hidden)}
      title={getButtonTitle(hidden)}
      onClick={onSwitchClick}
    ><Icon>arrow_drop_down</Icon></button>
    <Toolbar />
    <Profile hidden={hidden} />
  </div>
)


SidePanel.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onSwitchClick: PropTypes.func.isRequired
}

export default SidePanel
