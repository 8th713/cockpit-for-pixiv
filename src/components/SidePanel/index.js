import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { toggle as toggleSidePanel } from '../../reducers/sidePanel'
import SidePanel from './SidePanel'

export default connect(
  createStructuredSelector({
    hidden: ({ sidePanel }) => !sidePanel
  }),
  (dispatch) => ({
    onSwitchClick: toggleSidePanel.bindTo(dispatch)
  })
)(SidePanel)
