import * as React from 'react'
import { observer } from 'mobx-react'
import { IconButton } from './IconButton'
import { LikeNone, LikeActive } from '../shared/Icon'
import { Illust } from '../../store'

interface Props {
  illust?: Illust
}

@observer
export class LikeSwitch extends React.Component<Props> {
  handleClick = () => {
    this.props.illust!.likeItIfNeeded()
  }

  render() {
    const { illust } = this.props
    const disabled = !illust || illust.isSelf || illust.isUpdating
    const pattern = patterns[Number(illust && illust.isRated) || 0]

    return (
      <IconButton
        onClick={this.handleClick}
        disabled={disabled}
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
    label: `いいね！(L)`,
    icon: <LikeNone />
  },
  {
    label: `いいね！(L)`,
    icon: <LikeActive />
  }
]
