import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { slide } from '../../reducers/current'
import Canvas from './Canvas'

export default connect(
  createStructuredSelector({
    illust: ({ current, illusts }) => illusts[current.id]
  }),
  (dispatch) => ({
    onSlide: slide.bindTo(dispatch)
  })
)(Canvas)
