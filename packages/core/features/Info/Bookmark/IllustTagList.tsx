import React from 'react'
import { Flex } from '../../../shared/Box'
import { Button } from '../../../shared/Button'
import { Subtitle } from '../../../shared/Text'
import { BookmarkFormMethods, toggleTag, useWatchTags } from './utils'

export interface IllustTagListProps {
  control: BookmarkFormMethods['control']
  setValue: BookmarkFormMethods['setValue']
  items: Pixiv.IllustTag[]
}

export const IllustTagList = ({
  control,
  setValue,
  items,
}: IllustTagListProps) => {
  const fieldTags = useWatchTags(control)
  const allTags = items.map((tag) => tag.tag).join(' ')
  const allSelected = allTags === fieldTags.join(' ')

  return (
    <Flex css={{ flexDirection: 'column', rowGap: '$2' }}>
      <Flex css={{ alignItems: 'center' }}>
        <Subtitle css={{ flexGrow: 1, fontSize: '$body' }}>
          この作品のタグ
        </Subtitle>
        <Button
          variant="inherit"
          type="button"
          onClick={() => {
            setValue('tags', allSelected ? '' : allTags, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }}
        >
          すべて選択
        </Button>
      </Flex>
      <Flex
        css={{
          position: 'relative',
          flexWrap: 'wrap',
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
        {items.map((tag) => (
          <Button
            key={tag.tag}
            type="button"
            variant={fieldTags.includes(tag.tag) ? undefined : 'inherit'}
            onClick={() =>
              setValue('tags', toggleTag(fieldTags, tag.tag), {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            {tag.tag}
          </Button>
        ))}
      </Flex>
    </Flex>
  )
}
