// @flow
import './styles/TagList.css'
import React, {PureComponent} from 'react'
import type Tag from '../../entity/tag'

type Props = {
  +items: Tag[],
}

export default class TagList extends PureComponent<void, Props, void> {
  renderItem(tag: Tag) {
    return (<a
      key={tag.name}
      className="TagList-item"
      href={tag.url}
    >{tag.name}</a>)
  }

  render() {
    const {items} = this.props
    const children = items.map(this.renderItem)

    return (
      <div className="ListItem-TagList">
        <div className="ListItem-icon material-icons" title="タグ">label</div>
        <div className="ListItem-tags">{children}</div>
      </div>
    )
  }
}
