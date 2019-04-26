import React from 'react'
import { useSortContext } from '../../../hooks'
import { BookmarkForm } from '../../../interfaces'
import { Text } from '../../shared/Text'
import { sortBy } from '../utils'
import { SortButtons } from './SortButtons'
import { Tag, TagList, TagListHeader } from './Tag'

type Props = {
  tags: BookmarkForm['userTags']
  isSelected: (tag: string) => boolean
  onTagging: (tag: string) => void
  children?: never
}

export function UserTagList(props: Props) {
  const { tags, isSelected, onTagging } = props
  const { column, direction } = useSortContext()
  const sortedTags = sortBy(tags, column, direction)

  return (
    <section>
      <TagListHeader>
        <Text as="h2" v="s2">
          あなたのブックマークタグ
        </Text>
        <SortButtons />
      </TagListHeader>
      <TagList>
        {sortedTags.map(item => (
          <Tag
            key={item.name}
            lev={item.lev}
            name={item.name}
            selected={isSelected(item.name)}
            onClick={onTagging}
          />
        ))}
      </TagList>
    </section>
  )
}
