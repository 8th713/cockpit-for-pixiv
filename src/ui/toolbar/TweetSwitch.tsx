import * as React from 'react'
import { observer } from 'mobx-react'
import { IconButton } from './IconButton'
import { Tweet } from '../shared/Icon'
import { Illust } from '../../store'

interface Props {
  illust?: Illust
}

@observer
export class TweetSwitch extends React.Component<Props> {
  handleClick = () => {
    this.props.illust!.share()
  }

  render() {
    const { illust } = this.props
    const disabled = !illust

    return (
      <IconButton
        onClick={this.handleClick}
        disabled={disabled}
        aria-label="Twitterでシェア(S)"
        title="Twitterでシェア(S)"
      >
        <Tweet />
      </IconButton>
    )
  }
}
