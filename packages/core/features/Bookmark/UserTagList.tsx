import { Control, UseFormSetValue, useWatch } from 'react-hook-form'
import { Badge } from '../../shared/Badge'
import { Button } from '../../shared/Button'
import { IconButton } from '../../shared/IconButton'
import { IconProps } from '../../shared/Icons'
import { Pane, PaneBody, PaneHeader, PaneTitle } from './Pane'
import { splitTags } from './splitTags'
import { toggleTag } from './toggleTag'
import { useSort } from './useSort'

export interface UserTagListProps {
  control: Control<Pixiv.BookmarkState>
  setValue: UseFormSetValue<Pixiv.BookmarkState>
  tagList: Pixiv.MyTag[]
}

interface DirectionButtonProps {
  icon: React.ComponentType<IconProps>
  onClick: () => void
}

export function UserTagList({ control, setValue, tagList }: UserTagListProps) {
  const [sortedItems, { columnProps, directionProps }] = useSort(tagList)
  const currentFieldValue = useWatch({ control, name: 'tags' })
  const currentSelectedTags = splitTags(currentFieldValue)

  return (
    <Pane>
      <PaneHeader>
        <PaneTitle>あなたのブックマークタグ</PaneTitle>
        <Button type="button" {...columnProps} />
        <DirectionButton {...directionProps} />
      </PaneHeader>
      <PaneBody>
        {sortedItems.map((tag) => (
          <Button
            key={tag.name}
            type="button"
            variant={
              currentSelectedTags.includes(tag.name) ? 'primary' : 'inherit'
            }
            onClick={() =>
              setValue('tags', toggleTag(currentSelectedTags, tag.name), {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            {tag.name}
            <Badge>{tag.total}</Badge>
          </Button>
        ))}
      </PaneBody>
    </Pane>
  )
}

function DirectionButton({ icon: Icon, onClick }: DirectionButtonProps) {
  return (
    <IconButton css={{ size: 36 }} type="button" onClick={onClick}>
      <Icon size="sm" />
    </IconButton>
  )
}
