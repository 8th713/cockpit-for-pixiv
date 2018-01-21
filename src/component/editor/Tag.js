// @flow
import './styles/Tag.css'
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import cx from 'classnames'
import type {UseCase} from '../../useCase'
import type Tag from '../../entity/tag'

type Props = {
  +useCase: UseCase,
  +tag: Tag,
}

@observer
export default class TagButton extends Component<void, Props, void> {
  handleClick = () => {
    const {useCase, tag} = this.props

    useCase.editor.toggleTag(tag)
  };

  render() {
    const {tag} = this.props
    const classes = cx('Tag', tag.classes)

    return (
      <button
        key={tag.name}
        type="button"
        className={classes}
        onClick={this.handleClick}
      >{tag.name}</button>
    )
  }
}
