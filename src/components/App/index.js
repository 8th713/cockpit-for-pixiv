import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { reset } from '../../reducers/current'
import App from './App'

export default connect(
  createStructuredSelector({
    open: ({ current }) => !!current.id
  }),
  (dispatch) => ({
    onClose: reset.bindTo(dispatch)
  })
)(App)
