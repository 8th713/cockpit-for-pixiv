import React from 'react'
import { BookmarkForm, Illust } from '../../../interfaces'
import { splitTag } from '../utils'
import { IllustTagList } from './IllustTagsList'
import { TagField } from './TagField'
import { UserTagList } from './UserTagList'

type Props = {
  illust: Illust
  userTags: BookmarkForm['userTags']
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onTagging: (tag: string) => void
  children?: never
}

export function Tags(props: Props) {
  const illustTags = props.illust.tags.tags
  const userTags = props.userTags
  const selectedTags = splitTag(props.value)

  function isSelected(tag: string) {
    return selectedTags.includes(tag)
  }

  return (
    <>
      <TagField value={props.value} onChange={props.onChange} />
      <IllustTagList
        tags={illustTags}
        isSelected={isSelected}
        onTagging={props.onTagging}
      />
      <UserTagList
        tags={userTags}
        isSelected={isSelected}
        onTagging={props.onTagging}
      />
    </>
  )
}
