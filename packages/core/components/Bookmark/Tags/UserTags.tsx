import React from 'react'
import styled from 'styled-components'
import { Column } from '../../../constants'
import { useUserTags } from '../../../hooks'
import { SortProvider } from '../../../contexts'
import { Text } from '../../shared/Text'
import { Button } from '../../shared/Button'
import { Refresh } from '../../shared/Icon'
import { Tag, TagList } from './Tag'
import { sortBy } from '../utils'

type Props = {
  isSelected: (tag: string) => boolean
  onTagging: (tag: string) => void
  children?: never
}

export function UserTags(props: Props) {
  const { read, retry } = useUserTags()
  const { column, direction } = SortProvider.useValue()

  try {
    const tags = read()
    const list = sortBy(tags, column, direction)

    return (
      <section>
        <Row>
          <Text as="h2" v="s2">
            あなたのブックマークタグ
          </Text>
          <ButtonArea>
            <NameButton />
            <TotalButton />
          </ButtonArea>
          <Button v="icon" type="button" onClick={retry}>
            <Refresh />
          </Button>
        </Row>
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
      </section>
    )
  } catch (error) {
    if (error && error.then) {
      throw error
    }
    return (
      <section>
        <Row>
          <Text as="h2" v="s2">
            あなたのブックマークタグ
          </Text>
          <ButtonArea>
            <NameButton />
            <TotalButton />
          </ButtonArea>
          <Button v="icon" type="button" onClick={retry}>
            <Refresh />
          </Button>
        </Row>
        <TagList>取得できませんでした</TagList>
      </section>
    )
  }
}

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 8px;
  align-items: center;
  height: 48px;
`
const ButtonArea = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  align-items: center;
`
function NameButton() {
  const { column, direction, sortByName } = SortProvider.useValue()
  const color = column === Column.NAME ? 'default' : 'primary'
  const arrow = column === Column.NAME ? direction : ''

  return (
    <Button c={color} type="button" onClick={sortByName}>
      名前順{arrow}
    </Button>
  )
}
function TotalButton() {
  const { column, direction, sortByTotal } = SortProvider.useValue()
  const color = column === Column.TOTAL ? 'default' : 'primary'
  const arrow = column === Column.TOTAL ? direction : ''

  return (
    <Button c={color} type="button" onClick={sortByTotal}>
      件数順{arrow}
    </Button>
  )
}
