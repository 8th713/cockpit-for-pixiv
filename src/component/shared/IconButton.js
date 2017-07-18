// @flow
import './styles/IconButton.css'
import React, {PureComponent} from 'react'
import cx from 'classnames'
import {observer} from 'mobx-react'
import type Action from '../../action/interface'

type Props = {
  action: Action;
}

@observer
export default class IconButton extends PureComponent<void, Props, void> {
  render() {
    const {action} = this.props
    const classes = cx('IconButton inverse', {active: action.active})

    return (
      <button
        className={classes}
        title={action.label}
        disabled={action.disabled}
        onClick={action.execute}
      >
        <span className="material-icons">
          {action.icon}
        </span>
      </button>
    )
  }
}
