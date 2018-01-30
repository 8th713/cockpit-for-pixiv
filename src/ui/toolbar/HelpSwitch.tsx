import * as React from 'react'
import { observer } from 'mobx-react'
import { IconButton } from './IconButton'
import { Help } from '../shared/Icon'
import { HelpStore } from '../../store'

interface Props {
  store: HelpStore
}

@observer
export class HelpSwitch extends React.Component<Props> {
  handleClick = () => {
    this.props.store.open()
  }

  render() {
    return (
      <IconButton
        onClick={this.handleClick}
        aria-label="ヘルプ(?)"
        title="ヘルプ(?)"
      >
        <Help />
      </IconButton>
    )
  }
}
