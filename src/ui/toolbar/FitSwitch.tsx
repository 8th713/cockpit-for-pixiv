import * as React from 'react'
import { observer } from 'mobx-react'
import { IconButton } from './IconButton'
import { FitCover, FitContain, FitNone } from '../shared/Icon'
import { ViewStore } from '../../store'

interface Props {
  store: ViewStore
}

@observer
export class FitSwitch extends React.Component<Props> {
  handleClick = () => {
    this.props.store.cycleFit()
  }

  render() {
    const { fit } = this.props.store
    const pattern = patterns[fit]

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
    label: `ビューの横幅に合わせる(V)`,
    icon: <FitCover />
  },
  {
    label: `ビューに収まるように合わせる(V)`,
    icon: <FitContain />
  },
  {
    label: `原寸で表示する(V)`,
    icon: <FitNone />
  }
]
