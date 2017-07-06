import React, { Component } from 'react'
import PropTypes from 'prop-types';
import less from './style.less'
import Dialog from '../Dialog'

const { $, pixiv } = window

export default class Bookmark extends Component {
  static get propTypes() {
    return {
      content: PropTypes.any,
      onClose: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired
    }
  }

  constructor(...args) {
    super(...args)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidUpdate() {
    if (this.props.content) {
      this.body.appendChild(this.props.content)
      this.setup(this.body)
    } else {
      for (const el of [...this.body.children]) {
        el.remove()
      }
    }
  }

  setup(body) {
    const container = body.querySelector('.tag-cloud-container')

    pixiv.bookmarkTag.setup(container)
    pixiv.tag.setup()
    $('.ui-counter').counter()
    $(body).on('click', '.tag', (event) => {
      pixiv.tag.toggle(event.target.dataset.tag)
      return false
    })

    const form = body.querySelector('form')
    form.method = 'dialog'
    form.addEventListener('submit', () => {
      const btn = form.querySelector('input[type="submit"]')
      btn.disabled = true

      const { elements } = form
      this.props.onSubmit({
        restrict: Number(elements.restrict.value),
        comment: elements.comment.value.trim(),
        tags: elements.tag.value.trim()
      })
      this.props.onClose()
    })
    form.querySelector('input[name="comment"]').focus()
  }

  handleClose() {
    this.props.onClose()
  }

  render() {
    const open = !!this.props.content

    return (
      <Dialog open={open} onClose={this.handleClose}>
        <div
          className={less.bookmark}
          ref={(el) => { this.body = el }}
        />
      </Dialog>
    )
  }
}
