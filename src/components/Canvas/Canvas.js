import React, { Component, PropTypes } from 'react'
import less from './style.less'
import Progress from '../Progress'
import Img from '../Img'
import Uplayer from '../Uplayer'

export default class Canvas extends Component {
  static get propTypes() {
    return {
      open: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      // from react-redux
      illust: PropTypes.object,
      onSlide: PropTypes.func.isRequired
    }
  }

  constructor(...args) {
    super(...args)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.illust && nextProps.illust &&
      this.props.illust.illustId !== nextProps.illust.illustId
    ) {
      this.canvas.scrollTop = 0
    }
  }

  handleClick(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSlide(event.shiftKey ? -1 : 1)
  }

  renderWrapper(child) {
    return (
      <div
        tabIndex={1}
        className={less.canvas}
        onClick={this.props.onClose}
        ref={(el) => { this.canvas = el }}
      >{child}</div>
    )
  }

  render() {
    const { open, illust } = this.props

    if (!open) {
      return this.renderWrapper(null)
    }

    if (!illust) {
      return this.renderWrapper(
        <Progress onClick={this.handleClick} />
      )
    }

    if (illust.ugoira) {
      return this.renderWrapper(
        <Uplayer onClick={this.handleClick} illust={illust} />
      )
    }

    const children = illust.images.map((src) =>
      <Img key={src} onClick={this.handleClick} id={illust.illustId} src={src} />
    )
    return this.renderWrapper(<div>{children}</div>)
  }
}
