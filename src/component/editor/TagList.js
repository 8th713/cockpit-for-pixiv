// @flow
import './styles/TagList.css'
import React, {PureComponent} from 'react'
import {observer} from 'mobx-react'
import TagView from './Tag'
import type {UseCase} from '../../useCase'
import type Tag from '../../entity/tag'

type Props = {
  +useCase: UseCase,
  +items: Tag[],
}

@observer
export default class TagList extends PureComponent<void, Props, void> {
  renderItem = (tag: Tag) => {
    const {useCase} = this.props

    return (<TagView key={tag.name} useCase={useCase} tag={tag} />)
  }

  render() {
    const {items} = this.props
    const children = items.map(this.renderItem)

    return (
      <div className="TagList">{children}</div>
    )
  }
}
