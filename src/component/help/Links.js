// @flow
import React, {PureComponent} from 'react'
import type {Help} from '../../store/help'

type Props = {
  +help: Help,
}

export default class Links extends PureComponent<void, Props, void> {
  render() {
    const {info} = this.props.help

    return (
      <div className="Help-list">
        <a className="Help-item" href={info.homepage}>
          <span className="material-icons">code</span>
          <span className="Help-text">View the Github Project</span>
        </a>
        <a className="Help-item" href={info.supportURL}>
          <span className="material-icons">bug_report</span>
          <span className="Help-text">Report Issues</span>
        </a>
      </div>
    )
  }
}
