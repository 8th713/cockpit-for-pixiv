// @flow
import './styles/ListItem.css'
import React, {PureComponent} from 'react'

type Props = {
  +icon: string,
  +tip: string,
  +text: string | number,
}

export default class ListItem extends PureComponent<void, Props, void> {
  render() {
    const {icon, tip, text} = this.props

    return (
      <div className="ListItem">
        <div className="ListItem-icon material-icons" title={tip}>{icon}</div>
        <div className="ListItem-text">{text}</div>
      </div>
    )
  }
}
