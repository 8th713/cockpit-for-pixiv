import React, { Component, PropTypes } from 'react'
import getSize from '../../utils/getSize'

const { ZipImagePlayer } = window

export default class Uplayer extends Component {
  static get propTypes() {
    return {
      onClick: PropTypes.func.isRequired,
      // from react-redux
      image: PropTypes.object.isRequired,
      viewSize: PropTypes.object.isRequired,
      resize: PropTypes.bool.isRequired
    }
  }

  componentDidMount() {
    this.createPlayer(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.image !== nextProps.image) {
      this.destroyPlayer()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.image !== prevProps.image) {
      this.createPlayer(this.props)
    }
  }

  componentWillUnmount() {
    this.destroyPlayer()
  }

  createPlayer(props) {
    const { image } = props

    this.player = new ZipImagePlayer({
      metadata: image,
      canvas: this.canvas,
      source: image.src,
      chunkSize: 300000,
      loop: true,
      autoStart: true,
      autosize: true
    })
  }

  destroyPlayer() {
    this.player.stop()
    this.player = null
  }

  render() {
    const { image, resize, viewSize, onClick } = this.props
    const size = resize ? getSize(image, viewSize) : image

    const style = {
      width: `${size.width}px`,
      height: `${size.height}px`
    }

    return (
      <div><canvas
        draggable="true"
        key={image.src}
        ref={(el) => { this.canvas = el }}
        style={style}
        onClick={onClick}
      /></div>
    )
  }
}
