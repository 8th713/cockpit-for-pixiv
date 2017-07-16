// @flow
import React, {PureComponent} from 'react'

type Props = {
  +children: string,
}

export default class Caption extends PureComponent<void, Props, void> {
  render() {
    const {children} = this.props
    const HTML = {__html: children}

    return (
      <div className="ListItem-Caption">
        <div className="ListItem-icon material-icons" title="キャプション">subject</div>
        <div className="ListItem-html" dangerouslySetInnerHTML={HTML} />
      </div>
    )
  }
}
