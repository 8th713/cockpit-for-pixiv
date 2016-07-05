import React, { Component } from 'react'
import animate from '../../utils/animate'

export default function motion(getData, areEq) {
  return (Base) => class Motion extends Component {
    static get displayName() {
      return `Motion(${Base.name || Base.displayName})`
    }

    constructor(...args) {
      super(...args)
      this.state = {}
      this.step = this.step.bind(this)
    }

    componentDidMount() {
      const param = getData(this.props)

      const oBegin = param.begin || {}
      param.begin = () => {
        this.step(Object.assign({}, param.from, oBegin))
      }

      const oCompolete = param.complete || {}
      param.complete = () => {
        this.step(Object.assign({}, param.from, oCompolete))
      }

      param.update = () => this.step(param.from)
      this.animate = animate(param).restart()
    }

    componentWillReceiveProps(nextProps) {
      if (!areEq(this.props, nextProps)) {
        return
      }
      const param = getData(nextProps)

      const oBegin = param.begin || {}
      param.begin = () => {
        this.step(Object.assign({}, param.from, oBegin))
      }

      const oCompolete = param.complete || {}
      param.complete = () => {
        this.step(Object.assign({}, param.from, oCompolete))
      }

      param.update = () => this.step(param.from)
      this.animate = animate(param).restart()
    }

    componentWillUnmount() {
      this.animate.pause()
      this.animate = null
    }

    step(current) {
      this.setState(current)
    }

    render() {
      return <Base {...this.props} style={this.state} />
    }
  }
}
