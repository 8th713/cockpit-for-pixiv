import React from 'react'
import styled from 'styled-components'
import { Illust } from '../../../interfaces'
import { splitTag } from '../utils'
import { TagField } from './TagField'
import { Tag, TagList } from './Tag'
import { ReloadButton } from './ReloadButton'
import { UserTags } from './UserTags'
import { Text } from '../../shared/Text'
import { Progress } from '../../shared/Progress'
import { SortButtons } from './SortButtons'
import { UserTagsProvider } from '../../../contexts'

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
      <UserTagsProvider>
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
      </UserTagsProvider>
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
