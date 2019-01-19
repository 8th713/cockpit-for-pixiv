import React from 'react'
import { AsyncStatus } from '../../../interfaces'
import { IllustProvider, SortProvider } from '../../../contexts'
import { TagField } from './TagField'
import { IllustTags } from './IllustTags'
import { UserTags } from './UserTags'
import { splitTag } from '../utils'

type Props = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onTagging: (tag: string) => void
  children?: never
}

export function Tags(props: Props) {
  const result = IllustProvider.useValue()

  if (result.status !== AsyncStatus.Success) return null

  const items = result.value.tags.tags
  const tagList = splitTag(props.value)
  function isSelected(tag: string) {
    return tagList.includes(tag)
  }

  return (
    <>
      <TagField value={props.value} onChange={props.onChange} />
      <IllustTags
        illustTags={items}
        isSelected={isSelected}
        onTagging={props.onTagging}
      />
      <SortProvider>
        <UserTags isSelected={isSelected} onTagging={props.onTagging} />
      </SortProvider>
    </>
  )
}
