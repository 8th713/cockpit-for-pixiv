import React, { ComponentType } from 'react'
import { Badge } from '../../../shared/Badge'
import { Flex } from '../../../shared/Box'
import { Button } from '../../../shared/Button'
import { IconProps } from '../../../shared/createIcon'
import { IconButton } from '../../../shared/IconButton'
import { Subtitle } from '../../../shared/Text'
import { useSort } from './useSort'
import { BookmarkFormMethods, toggleTag, useWatchTags } from './utils'

export interface UserTagListProps {
  control: BookmarkFormMethods['control']
  setValue: BookmarkFormMethods['setValue']
  items: Pixiv.MyTag[]
}

interface ColumnButtonProps {
  children: string
  onClick: () => void
}

interface DirectionButtonProps {
  icon: ComponentType<IconProps>
  onClick: () => void
}

export const UserTagList = ({ control, setValue, items }: UserTagListProps) => {
  const [sortedItems, { columnProps, directionProps }] = useSort(items)
  const fieldTags = useWatchTags(control)

  return (
    <Flex css={{ flexDirection: 'column', rowGap: '$2' }}>
      <Flex css={{ alignItems: 'center' }}>
        <Subtitle css={{ flexGrow: 1, fontSize: '$body' }}>
          あなたのブックマークタグ
        </Subtitle>
        <ColumnButton {...columnProps} />
        <DirectionButton {...directionProps} />
      </Flex>
      <Flex
        css={{
          position: 'relative',
          flexWrap: 'wrap',
          minHeight: 124,
          padding: '$1',
          gap: '$1',
          '::after': {
            content: '""',
            pointerEvents: 'none',
            cover: 0,
            borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.12)',
          },
        }}
      >
        {sortedItems.map((tag) => (
          <Button
            key={tag.name}
            type="button"
            variant={fieldTags.includes(tag.name) ? undefined : 'inherit'}
            onClick={() =>
              setValue('tags', toggleTag(fieldTags, tag.name), {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            {tag.name}
            <Badge>{tag.total}</Badge>
          </Button>
        ))}
      </Flex>
    </Flex>
  )
}

const ColumnButton = ({ children, onClick }: ColumnButtonProps) => (
  <Button variant="inherit" type="button" onClick={onClick}>
    {children}
  </Button>
)

const DirectionButton = ({ icon: Icon, onClick }: DirectionButtonProps) => (
  <IconButton css={{ size: 36 }} type="button" onClick={onClick}>
    <Icon size="sm" />
  </IconButton>
)