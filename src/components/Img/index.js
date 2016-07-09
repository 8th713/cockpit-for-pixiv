import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import sentinel from '../helpers/sentinel'
import { fetch } from '../../reducers/images'
import Img from './Img'

export default compose(
  connect(
    createStructuredSelector({
      image: ({ images }, { src }) => images[src],
      viewSize: ({ viewSize }) => viewSize,
      resize: ({ resize }) => resize
    }),
    (dispatch) => ({
      onEnter: fetch.bindTo(dispatch)
    })
  ),
  sentinel({
    getStyle({ viewSize }) {
      return { width: viewSize.width * 0.75, height: viewSize.height * 0.75 }
    },
    enter({ image, src, onEnter }) {
      if (!image.width) { onEnter(src) }
    }
  })
)(Img)
