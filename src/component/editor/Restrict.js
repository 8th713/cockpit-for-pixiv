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
export default class Restrict extends PureComponent<void, Props, void> {
  items = ['公開', '非公開']

  handleChange = (event: SyntheticInputEvent) => {
    this.props.useCase.editor.editRestrict(event.target.value)
  };

  renderItem = (label: string, value: number) => {
    const {editor} = this.props

    return (
      <li key={value}>
        <label>
          <input
            type="radio"
            name="restrict"
            value={value}
            checked={value === editor.restrict}
            onChange={this.handleChange}
          />
          <span>{label}</span>
        </label>
      </li>
    )
  };

  render() {
    const children = this.items.map(this.renderItem)

    return (<ul className="privacy">{children}</ul>)
  }
}
