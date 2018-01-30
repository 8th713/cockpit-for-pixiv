import * as React from 'react'
import { observer } from 'mobx-react'
import { IconButton } from './IconButton'
import { SpreadBasic, SpreadShift, SpreadNone } from '../shared/Icon'
import { ViewStore } from '../../store'

interface Props {
  store: ViewStore
}

@observer
export class SpreadSwitch extends React.Component<Props> {
  handleClick = () => {
    this.props.store.cycleSpread()
  }

  render() {
    const { spread } = this.props.store
    const pattern = patterns[spread]

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
    label: `見開き表示(H)`,
    icon: <SpreadBasic />
  },
  {
    label: `見開き表示 + 先頭余白(H)`,
    icon: <SpreadShift />
  },
  {
    label: `一列表示(H)`,
    icon: <SpreadNone />
  }
]
