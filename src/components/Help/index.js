import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { close } from '../../reducers/help'
import Help from './Help'

export default connect(
  createStructuredSelector({
    open: ({ help }) => help
  }),
  (dispatch) => ({
    onClose: close.bindTo(dispatch)
  })
)(Help)
