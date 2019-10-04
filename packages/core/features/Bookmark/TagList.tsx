import css from '@styled-system/css'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import {
  Badge,
  Box,
  Button,
  extend,
  Flex,
  Heading,
  IconButton,
  SortAscIcon,
  SortDescIcon,
  themeGet
} from '../../components'
import { useStorage } from '../../hooks/useStorage'

type Column = 'total' | 'name'

type Direction = '↓' | '↑'

interface Props {
  current: string[]
  onChange: (value: { tags: string }) => void
}

interface IllustTagListProps extends Props {
  items: Pixiv.IllustTag[]
}

interface UserTagListProps extends Props {
  items: Pixiv.UserTag[]
}

interface TagProps extends React.ComponentPropsWithoutRef<typeof Button> {
  active?: boolean
}

interface ColumnButtonProps {
  onClick: () => void
  column: Column
}

interface DirectionButtonProps {
  onClick: () => void
  direction: Direction
}

export const IllustTagList = ({
  items,
  current,
  onChange
}: IllustTagListProps) => {
  const tagging = (tag: string) => onChange({ tags: toggleTag(current, tag) })

  return (
    <Box as="section" sx={{ mt: 3, mb: 2 }}>
      <Subheader>この作品のタグ</Subheader>
      <List>
        {items.map(tag => (
          <Tag
            key={tag.tag}
            active={current.includes(tag.tag)}
            onClick={() => tagging(tag.tag)}
          >
            {tag.tag}
          </Tag>
        ))}
      </List>
    </Box>
  )
}

export const UserTagList = ({ items, current, onChange }: UserTagListProps) => {
  const tagging = (tag: string) => onChange({ tags: toggleTag(current, tag) })
  const [column, setColumn] = useStorage<Column>('sortColumn', 'total')
  const [direction, setDirection] = useStorage<Direction>('sortDirection', '↑')
  const toggleCol = () => setColumn(column === 'name' ? 'total' : 'name')
  const toggleDir = () => setDirection(direction === '↑' ? '↓' : '↑')
  const sortedTags = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const aValue = a[column]!
      const bValue = b[column]!

      if (aValue < bValue) return 1
      if (aValue > bValue) return -1
      return 0
    })

    return direction === '↓' ? sorted : sorted.reverse()
  }, [items, column, direction])

  return (
    <Box as="section" sx={{ mt: 3, mb: 2 }}>
      <Flex>
        <Subheader>あなたのブックマークタグ</Subheader>
        <Flex sx={{ alignItems: 'center', ml: 'auto' }}>
          <ColumnButton column={column} onClick={toggleCol} />
          <DirectionButton direction={direction} onClick={toggleDir} />
        </Flex>
      </Flex>
      <List>
        {sortedTags.map(tag => (
          <Tag
            key={tag.name}
            active={current.includes(tag.name)}
            onClick={() => tagging(tag.name)}
          >
            {tag.name}
            <Badge sx={{ ml: 2 }}>{tag.total}</Badge>
          </Tag>
        ))}
      </List>
    </Box>
  )
}

const Subheader = styled(Heading)(
  css({
    display: 'flex',
    alignItems: 'center',
    height: 48
  })
)
Subheader.defaultProps = {
  variant: 'h3'
}

const List = styled.div(
  extend({
    position: 'relative',
    p: 2,
    pb: 1,
    borderRadius: 4,
    variant: 'text.body2',
    '::after': {
      content: '""',
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      bg: '#fff',
      opacity: themeGet('opacities.divider')
    }
  })
)

const Tag = ({ active, ...props }: TagProps) => (
  <Button
    type="button"
    variant={active ? 'primary' : 'inherit'}
    sx={{
      mb: 1,
      '&+&': {
        ml: 1
      }
    }}
    {...props}
  />
)

const ColumnButton = ({ onClick, column }: ColumnButtonProps) => {
  const label = column === 'name' ? '名前' : '使用回数'
  return (
    <Button variant="outlined" sx={{ mr: 1 }} type="button" onClick={onClick}>
      {label}
    </Button>
  )
}

const DirectionButton = ({ onClick, direction }: DirectionButtonProps) => {
  const Icon = direction === '↑' ? SortAscIcon : SortDescIcon
  return (
    <IconButton sx={{ width: 36, height: 36 }} type="button" onClick={onClick}>
      <Icon sx={{ width: 18, height: 18 }} />
    </IconButton>
  )
}

const toggleTag = (list: string[], tag: string) => {
  const set = new Set(list)

  if (set.has(tag)) {
    set.delete(tag)
  } else {
    set.add(tag)
  }
  return [...set].join(' ')
}

if (__DEV__) {
  IllustTagList.displayName = 'TagList.IllustTagList'
  UserTagList.displayName = 'TagList.UserTagList'
  Subheader.displayName = 'TagList.Subheader'
  List.displayName = 'TagList.List'
  Tag.displayName = 'TagList.Tag'
  ColumnButton.displayName = 'TagList.ColumnButton'
  DirectionButton.displayName = 'TagList.DirectionButton'
}
