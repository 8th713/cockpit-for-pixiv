import React from 'react'
import { UserTagsProvider } from '../../../contexts'
import { Tag, TagList } from './Tag'
import { sortBy } from '../utils'

type Props = {
  isSelected: (tag: string) => boolean
  onTagging: (tag: string) => void
  children?: never
}

export function UserTags(props: Props) {
  const { column, direction, read } = UserTagsProvider.useValue()

  try {
    const tags = read()
    const list = sortBy(tags, column, direction)

    return (
      <TagList>
        {list.map(({ name, lev }) => (
          <Tag
            key={name}
            lev={lev}
            name={name}
            selected={props.isSelected(name)}
            onClick={props.onTagging}
          />
        ))}
      </TagList>
    )
  } catch (error) {
    if (error && error.then) {
      throw error
    }
    return <TagList>取得できませんでした</TagList>
  }
}
