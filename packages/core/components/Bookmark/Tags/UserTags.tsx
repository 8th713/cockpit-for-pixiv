import React from 'react'
import styled from 'styled-components'
import { AsyncStatus, Column } from '../../../interfaces'
import { useUserTags } from '../../../hooks'
import { SortProvider } from '../../../contexts'
import { Text } from '../../shared/Text'
import { Progress } from '../../shared/Progress'
import { Button } from '../../shared/Button'
import { Refresh } from '../../shared/Icon'
import { Tag, TagList } from './Tag'
import { sortBy } from '../utils'

type Props = {
  isSelected: (tag: string) => boolean
  onTagging: (tag: string) => void
  children?: never
}

export const UserTags = React.memo(function UserTags(props: Props) {
  const { result, actions } = useUserTags()
  const { column, direction } = SortProvider.useValue()

  switch (result.status) {
    case AsyncStatus.Loading: {
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
            <Button v="icon" type="button" disabled>
              <Refresh />
            </Button>
          </Row>
          <TagList>
            <Progress size={48} />
          </TagList>
        </section>
      )
    }
    case AsyncStatus.Failure: {
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
            <Button v="icon" type="button" onClick={actions.retry}>
              <Refresh />
            </Button>
          </Row>
          <TagList>取得できませんでした</TagList>
        </section>
      )
    }
    case AsyncStatus.Success: {
      const { value } = result
      const list = sortBy(value, column, direction)

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
            <Button v="icon" type="button" onClick={actions.reload}>
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
    }
  }
})

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
const NameButton = React.memo(function NameButton() {
  const { column, direction, sortByName } = SortProvider.useValue()
  const color = column === Column.NAME ? 'default' : 'primary'
  const arrow = column === Column.NAME ? direction : ''

  return (
    <Button c={color} type="button" onClick={sortByName}>
      名前順{arrow}
    </Button>
  )
})
const TotalButton = React.memo(function TotalButton() {
  const { column, direction, sortByTotal } = SortProvider.useValue()
  const color = column === Column.TOTAL ? 'default' : 'primary'
  const arrow = column === Column.TOTAL ? direction : ''

  return (
    <Button c={color} type="button" onClick={sortByTotal}>
      件数順{arrow}
    </Button>
  )
})
