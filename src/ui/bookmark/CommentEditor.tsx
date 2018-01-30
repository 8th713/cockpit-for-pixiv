import * as React from 'react'
import { observer } from 'mobx-react'
import { CounterInput } from './CounterInput'
import { BookmarkVM } from '../../store'

interface Props {
  store: BookmarkVM
}

@observer
export class CommentEditor extends React.Component<Props> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.store.update({
      comment: event.target.value
    })
  }

  render() {
    const { store } = this.props

    return (
      <CounterInput
        type="text"
        placeholder="ブックマークコメント"
        name="comment"
        maxLength={140}
        value={store.comment}
        onChange={this.handleChange}
        autoFocus
        count={store.commentCount}
      />
    )
  }
}
