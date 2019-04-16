import React from 'react'
import { Illust } from '../../../interfaces'
import { Text } from '../../shared/Text'
import { Tag, TagList, TagListHeader } from './Tag'

type Props = {
  tags: Illust['tags']['tags']
  isSelected: (tag: string) => boolean
  onTagging: (tag: string) => void
  children?: never
}

export function IllustTagList(props: Props) {
  const { tags, isSelected, onTagging } = props

  return (
    <section>
      <TagListHeader>
        <Text as="h2" v="s2">
          この作品のタグ
        </Text>
      </TagListHeader>
      <TagList>
        {tags.map(item => (
          <Tag
            key={item.tag}
            lev={6}
            name={item.tag}
            selected={isSelected(item.tag)}
            onClick={onTagging}
          />
        ))}
      </TagList>
    </section>
  )
}
