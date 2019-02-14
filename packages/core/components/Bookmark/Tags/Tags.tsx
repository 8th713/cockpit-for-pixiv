import React from 'react'
import styled from 'styled-components'
import { Illust } from '../../../interfaces'
import { Progress } from '../../shared/Progress'
import { Text } from '../../shared/Text'
import { splitTag } from '../utils'
import { ReloadButton } from './ReloadButton'
import { SortButtons } from './SortButtons'
import { Tag, TagList } from './Tag'
import { TagField } from './TagField'
import { UserTags } from './UserTags'

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
      <section>
        <Row>
          <Text as="h2" v="s2">
            この作品のタグ
          </Text>
        </Row>
        <TagList>
          {items.map(item => (
            <Tag
              key={item.tag}
              lev={6}
              name={item.tag}
              selected={isSelected(item.tag)}
              onClick={props.onTagging}
            />
          ))}
        </TagList>
      </section>
      <section>
        <Row>
          <Text as="h2" v="s2">
            あなたのブックマークタグ
          </Text>
          <SortButtons />
          <ReloadButton />
        </Row>
        <React.Suspense fallback={<Progress size={64} />}>
          <UserTags isSelected={isSelected} onTagging={props.onTagging} />
        </React.Suspense>
      </section>
    </>
  )
}

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 8px;
  align-items: center;
  height: 48px;
`
