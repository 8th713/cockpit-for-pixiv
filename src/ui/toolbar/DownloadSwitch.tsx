import * as React from 'react'
import { observer } from 'mobx-react'
import { IconButton } from './IconButton'
import { Download } from '../shared/Icon'
import { Illust } from '../../store'

interface Props {
  illust?: Illust
}

@observer
export class DownloadSwitch extends React.Component<Props> {
  handleClick = () => {
    this.props.illust!.download()
  }

  render() {
    const { illust } = this.props
    const disabled = !illust

    return (
      <IconButton
        onClick={this.handleClick}
        disabled={disabled}
        aria-label="ダウンロード(D)"
        title="ダウンロード(D)"
      >
        <Download />
      </IconButton>
    )
  }
}
