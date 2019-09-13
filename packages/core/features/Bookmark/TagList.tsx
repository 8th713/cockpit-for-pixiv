import React from 'react'
import styled from 'styled-components'
import { Box, Button, Text } from '../../components'
import { useStorage } from '../../hooks/useStorage'
import { toggleTag, Column, Direction, sort } from './utils'

interface Props {
  currentTags: string[]
  onChange: (value: { tags: string }) => void
}
interface IllustTagListProps extends Props {
  items: Pixiv.IllustTag[]
}
interface UserTagListProps extends Props {
  items: Pixiv.UserTag[]
}
export const IllustTagList = ({
  currentTags,
  items,
  onChange
}: IllustTagListProps) => {
  const handleTagging = (tag: string) => {
    const tags = toggleTag(currentTags, tag)
    onChange({ tags })
  }

  return (
    <Box mt={3} mb={2}>
      <Header>
        <Text textStyle="h2" em="high">
          この作品のタグ
        </Text>
      </Header>
      <List>
        {items.map(item => (
          <Tag
            key={item.tag}
            type="button"
            data-level={6}
            aria-pressed={currentTags.includes(item.tag)}
            onClick={() => handleTagging(item.tag)}
          >
            {item.tag}
          </Tag>
        ))}
      </List>
    </Box>
  )
}
export const UserTagList = ({
  currentTags,
  items,
  onChange
}: UserTagListProps) => {
  const [column, setColumn] = useStorage<Column>('sortColumn', 'total')
  const [direction, setDirection] = useStorage<Direction>('sortDirection', '↑')
  const sortedItems = sort(items, column, direction)
  const sortBy = (type: Column) =>
    type === column
      ? setDirection(direction === '↑' ? '↓' : '↑')
      : setColumn(type)
  const sortByTotal = () => sortBy('total')
  const sortByName = () => sortBy('name')
  const handleTagging = (tag: string) => {
    const tags = toggleTag(currentTags, tag)
    onChange({ tags })
  }

  return (
    <Box mt={3}>
      <Header>
        <Text textStyle="h2" em="high">
          あなたのブックマークタグ
        </Text>
        <Box>
          <Button
            variant="outlined"
            colors={column === 'name' ? 'primary' : undefined}
            type="button"
            onClick={sortByName}
          >
            名前順{column === 'name' && direction}
          </Button>
          <Button
            variant="outlined"
            colors={column === 'total' ? 'primary' : undefined}
            type="button"
            onClick={sortByTotal}
          >
            件数順{column === 'total' && direction}
          </Button>
        </Box>
      </Header>
      <List>
        {sortedItems.map(item => (
          <Tag
            key={item.name}
            type="button"
            data-level={item.lev}
            aria-pressed={currentTags.includes(item.name)}
            onClick={() => handleTagging(item.name)}
          >
            {item.name}
          </Tag>
        ))}
      </List>
    </Box>
  )
}

const Header = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: space-between;
`
const List = styled.div`
  position: relative;
  overflow: hidden;
  padding: 16px 8px 8px 16px;
  border-radius: 8px;
  line-height: 32px;
  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--on-surface);
    opacity: var(--divider);
  }
`
const Tag = styled.button`
  cursor: pointer;
  user-select: none;
  outline: none;
  box-sizing: border-box;
  position: relative;
  z-index: 0;
  display: inline-flex;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 8px;
  padding: 2px 8px;
  border: 0;
  border-radius: 2px;
  background-color: transparent;
  color: var(--primary);
  font: inherit;
  line-height: 1;
  align-items: center;
  justify-content: center;
  &[aria-pressed='true'] {
    background-color: var(--primary);
    color: var(--on-primary);
  }
  &[data-level='1'] {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }
  &[data-level='2'] {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.02em;
  }
  &[data-level='3'] {
    margin-top: 4px;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  &[data-level='4'] {
    margin-top: 4px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.04em;
  }
  &[data-level='5'] {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  &[data-level='6'] {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0em;
  }
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 15ms linear;
  }
  &:hover::before {
    opacity: var(--hovered);
  }
  &:focus::before {
    opacity: var(--focused);
  }
  &:active::before {
    opacity: var(--pressed);
  }
`
