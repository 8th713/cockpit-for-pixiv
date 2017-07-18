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
export default class TagEditor extends PureComponent<void, Props, void> {
  input: HTMLInputElement;

  setRef = (input: HTMLInputElement) => {
    this.input = input
  };

  handleChange = () => {
    this.props.useCase.editor.editTags(this.input.value)
  };

  render() {
    const {editor} = this.props

    return (
      <div>
        <div className="input-box tags">
          <input
            ref={this.setRef}
            type="text"
            placeholder="ブックマークタグ"
            name="tag"
            maxLength="1024"
            value={editor.tags}
            onChange={this.handleChange}
          />
          <span className="count">{editor.tagSize}</span>
        </div>
        <div id="bookmark_add_alert">タグは10個までしか登録できません。</div>
        <p className="notes">*スペース区切りで10個まで登録できます。英数字等は半角に統一されます。</p>
      </div>
    )
  }
}
