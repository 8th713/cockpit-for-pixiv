import React, { Component } from 'react'

export default function sentinel(options = {}) {
  const id = (t) => t
  const { getStyle = id, enter = id, leave = id } = options
  const dispatch = (props, { visible }) => {
    if (visible) {
      enter(props)
    } else {
      leave(props)
    }
  }

  return (Base) => class Sentinel extends Component {
    static get displayName() {
      return `Sentinel(${Base.name || Base.displayName})`
    }

    constructor(...args) {
      super(...args)
      this.state = { visible: false }
    }

    componentDidMount() {
      this.observer = this.createObserver()
      this.observe(this.el)
    }

    componentWillUpdate(nextProps, nextState) {
      if (this.state.visible !== nextState.visible) {
        dispatch(nextProps, nextState)
      }
    }

    componentDidUpdate() {
      const { el, current } = this

      if (el !== current) {
        if (current) {
          this.observer.unobserve(current)
        }
        this.observe(el)
      }
    }

    componentWillUnmount() {
      this.observer.disconnect()
      this.observer = this.current = null
    }

    isVisible({ intersectionRatio }) {
      return intersectionRatio !== 0
    }

    createObserver() {
      const threshold = [0, 0.5, 1]
      return new IntersectionObserver((entries) => {
        const visible = this.isVisible(entries[0])
        this.setState({ visible })
      }, { threshold })
    }

    observe(target) {
      this.current = target
      if (target) {
        this.observer.observe(target)
      }
    }

    render() {
      const { visible } = this.state

      if (visible) {
        return <Base {...this.props} />
      }
      return (<div
        style={getStyle(this.props)}
        ref={(el) => { this.el = el }}
      />)
    }
  }
}
