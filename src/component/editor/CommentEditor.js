// @flow
import React, {PureComponent} from 'react'
import {observer} from 'mobx-react'
import type {Editor} from '../../store/editor'
import type {UseCase} from '../../useCase'

type Props = {
  +editor: Editor,
  +useCase: UseCase,
}

@observer
export default class CommentEditor extends PureComponent<void, Props, void> {
  input: HTMLInputElement;

  setRef = (input: HTMLInputElement) => {
    this.input = input
  };

  handleChange = () => {
    this.props.useCase.editor.editComment(this.input.value)
  };

  render() {
    const {editor} = this.props

    return (
      <div className="input-box ui-counter">
        <input
          ref={this.setRef}
          type="text"
          placeholder="ブックマークコメント"
          name="comment"
          maxLength="140"
          value={editor.comment}
          onChange={this.handleChange}
          autoFocus
        />
        <span className="count">{editor.commentSize}</span>
      </div>
    )
  }
}
