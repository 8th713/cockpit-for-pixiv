import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Uplayer from './Uplayer'

export default connect(
  createStructuredSelector({
    image: (_, { illust }) => illust.ugoira,
    viewSize: ({ viewSize }) => viewSize,
    resize: ({ resize }) => resize
  })
)(Uplayer)
