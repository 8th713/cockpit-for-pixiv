import * as React from 'react'
import { observer } from 'mobx-react'
import { IconButton } from './IconButton'
import { InfoNone, InfoActive } from '../shared/Icon'
import { InfoStore } from '../../store'

interface Props {
  store: InfoStore
}

@observer
export class InfoSwitch extends React.Component<Props> {
  handleClick = () => {
    this.props.store.toggle()
  }

  render() {
    const { opened } = this.props.store
    const pattern = patterns[Number(opened)]

    return (
      <IconButton
        onClick={this.handleClick}
        aria-label={pattern.label}
        title={pattern.label}
      >
        {pattern.icon}
      </IconButton>
    )
  }
}

const patterns = [
  {
    label: `情報パネルを開く(I)`,
    icon: <InfoNone />
  },
  {
    label: `情報パネルを閉じる(I)`,
    icon: <InfoActive />
  }
]
