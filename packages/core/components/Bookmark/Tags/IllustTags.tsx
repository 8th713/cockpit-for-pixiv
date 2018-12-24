import React from 'react'
import styled from 'styled-components'
import { Illust } from '../../../interfaces'
import { Text } from '../../shared/Text'
import { Tag, TagList } from './Tag'

type Props = {
  illustTags: Illust['tags']['tags']
  isSelected: (tag: string) => boolean
  onTagging: (tag: string) => void
  children?: never
}

export const IllustTags = React.memo(function IllustTags(props: Props) {
  const list = props.illustTags

  return (
    <section>
      <Row>
        <Text as="h2" v="s2">
          あなたのブックマークタグ
        </Text>
      </Row>
      <TagList>
        {list.map(item => (
          <Tag
            key={item.tag}
            lev={6}
            name={item.tag}
            selected={props.isSelected(item.tag)}
            onClick={props.onTagging}
          />
        ))}
      </TagList>
    </section>
  )
})

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 48px;
  align-items: center;
  height: 48px;
`
