import React from 'react'
import { Illust } from '../../../interfaces'
import { SortProvider } from '../../../contexts'
import { TagField } from './TagField'
import { IllustTags } from './IllustTags'
import { UserTags } from './UserTags'
import { splitTag } from '../utils'
import { Progress } from '../../shared/Progress'

type Props = {
  illust: Illust
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onTagging: (tag: string) => void
  children?: never
}

export function Tags(props: Props) {
  const items = props.illust.tags.tags
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
        <React.Suspense fallback={<Progress size={128} />}>
          <UserTags isSelected={isSelected} onTagging={props.onTagging} />
        </React.Suspense>
      </SortProvider>
    </>
  )
}
