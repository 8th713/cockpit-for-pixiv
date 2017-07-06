import React, { Component } from 'react'
import PropTypes from 'prop-types';
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
    this.handleGrab = this.handleGrab.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
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

  handleGrab(event) {
    this.grabData = {
      x: event.clientX,
      y: event.clientY,
      left: this.canvas.scrollLeft,
      top: this.canvas.scrollTop
    }
  }

  handleDrag(event) {
    const { clientX, clientY } = event
    if (!clientX && !clientY) { return }

    const { x, y, left, top } = this.grabData
    this.canvas.scrollLeft = left - (clientX - x)
    this.canvas.scrollTop = top - (clientY - y)
  }

  handleDragOver(event) {
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'move'
    event.preventDefault()
  }

  renderWrapper(child) {
    return (
      <div
        tabIndex={1}
        className={less.canvas}
        onClick={this.props.onClose}
        onDragStart={this.handleGrab}
        onDrag={this.handleDrag}
        onDragOver={this.handleDragOver}
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
