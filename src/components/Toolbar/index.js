import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { toggle as toggleResize } from '../../reducers/resize'
import { toggle as toggleHelp } from '../../reducers/help'
import { open, closeAsnyc } from '../../reducers/toolbar'
import Toolbar from './Toolbar'

export default connect(
  createStructuredSelector({
    hidden: ({ toolbar }) => !toolbar,
    btnState: ({ resize }) => ({ resize })
  }),
  (dispatch) => ({
    onEnter: open.bindTo(dispatch),
    onLeave: closeAsnyc.bindTo(dispatch),
    actions: {
      onResizeClick: toggleResize.bindTo(dispatch),
      onHelpClick: toggleHelp.bindTo(dispatch)
    }
  })
)(Toolbar)
