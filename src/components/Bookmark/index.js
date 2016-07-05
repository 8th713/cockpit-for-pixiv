import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { reset } from '../../reducers/bookmark'
import { bookmark } from '../../reducers/illusts'
import Bookmark from './Bookmark'

export default connect(
  createStructuredSelector({
    content: (state) => state.bookmark
  }),
  (dispatch) => ({
    onClose: reset.bindTo(dispatch),
    onSubmit: bookmark.bindTo(dispatch)
  })
)(Bookmark)
