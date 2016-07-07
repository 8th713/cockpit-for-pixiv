import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { reset } from '../../reducers/error'
import Snackbar from './Snackbar'

export default connect(
  createStructuredSelector({
    content: ({ error }) => error && error.message
  }),
  (dispatch) => ({
    onClick: reset.bindTo(dispatch)
  })
)(Snackbar)
