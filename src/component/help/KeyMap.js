// @flow
import React, {PureComponent} from 'react'
import type Action from '../../action/interface'

type Props = {
  +items: Action[],
}

export default class KeyMap extends PureComponent<void, Props, void> {
  renderRow = (action: Action, index: number) => {
    return (
      <tr key={index}>
        <td><kbd>{action.key}</kbd></td>
        <td>{action.description}</td>
      </tr>
    )
  }

  render() {
    const {items} = this.props
    const list = items.map(this.renderRow)

    return (<table><tbody>{list}</tbody></table>)
  }
}
