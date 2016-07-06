import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetch } from '../../reducers/bookmark'
import { rate, download, share } from '../../reducers/illusts'
import Profile from './Profile'

export default connect(
  createStructuredSelector({
    illust: ({ current, illusts }) => illusts[current.id]
  }),
  (dispatch) => ({
    actions: {
      onBookmarkClick: fetch.bindTo(dispatch),
      onRateClick: rate.bindTo(dispatch),
      onDownloadClick: download.bindTo(dispatch),
      onShareClick: share.bindTo(dispatch)
    }
  })
)(Profile)
