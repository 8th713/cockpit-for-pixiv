import React, { Component } from 'react'

export default function delay(wait = 0) {
  return (Base) => class Delay extends Component {
    static get displayName() {
      return `Delay(${Base.name || Base.displayName})`
    }

    constructor(...args) {
      super(...args)
      this.state = { done: false }
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({ done: true })
      }, wait)
    }

    componentWillReceiveProps() {
      this.setState({ done: false })
    }

    componentDidUpdate() {
      if (this.state.done === false) {
        setTimeout(() => {
          this.setState({ done: true })
        }, wait)
      }
    }

    render() {
      if (this.state.done) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.log('delayed!!')
        }
        return <Base {...this.props} />
      }

      return null
    }
  }
}
