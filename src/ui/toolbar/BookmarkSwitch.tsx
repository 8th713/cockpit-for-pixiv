import * as React from 'react'
import { observer } from 'mobx-react'
import { BookmarkNone, BookmarkActive } from '../shared/Icon'
import { IconButton } from './IconButton'
import { BookmarkStore } from '../../store'

interface Props {
  store: BookmarkStore
}

@observer
export class BookmarkSwitch extends React.Component<Props> {
  handleClick = () => {
    this.props.store.open()
  }

  render() {
    const illust = this.props.store.current
    const disabled = !illust || illust.isSelf
    const pattern =
      patterns[Number(illust && illust.bookmark.isBookmarked) || 0]

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
    label: `ブックマークダイアログを表示(B)`,
    icon: <BookmarkNone />
  },
  {
    label: `ブックマークダイアログを表示(B)`,
    icon: <BookmarkActive />
  }
]
