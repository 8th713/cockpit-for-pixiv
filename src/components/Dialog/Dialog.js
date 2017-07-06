import React, { Component } from 'react'
import PropTypes from 'prop-types';
import less from './style.less'

export default class Dialog extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
      open: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired
    }
  }

  static get defaultProps() {
    return {
      onClose: () => {}
    }
  }

  constructor(...args) {
    super(...args)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.modal.addEventListener('cancel', () => {
      this.props.onClose()
    })
    this.updateVisibility(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.updateVisibility(nextProps)
  }

  updateVisibility(props) {
    if (props.open) {
      this.show()
    } else {
      this.hide()
    }
  }

  show() {
    if (!this.modal.open) {
      this.modal.showModal()
    }
  }

  hide() {
    if (this.modal.open) {
      this.modal.close()
    }
  }

  handleClick(event) {
    if (event.target === this.modal) {
      this.props.onClose()
    }
  }

  render() {
    return (
      <dialog
        className={less.dialog}
        ref={(el) => { this.modal = el }}
        onClick={this.handleClick}
      >{this.props.children}</dialog>
    )
  }
}
