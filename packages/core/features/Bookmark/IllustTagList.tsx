import { Control, UseFormSetValue, useWatch } from 'react-hook-form'
import { Button } from '../../shared/Button'
import { Pane, PaneBody, PaneHeader, PaneTitle } from './Pane'
import { splitTags } from './splitTags'
import { toggleTag } from './toggleTag'

export interface IllustTagListProps {
  control: Control<Pixiv.BookmarkState>
  setValue: UseFormSetValue<Pixiv.BookmarkState>
  tagList: Pixiv.IllustTag[]
}

export function IllustTagList({
  control,
  setValue,
  tagList,
}: IllustTagListProps) {
  const currentFieldValue = useWatch({ control, name: 'tags' })
  const currentSelectedTags = splitTags(currentFieldValue)

  return (
    <Pane>
      <PaneHeader>
        <PaneTitle>この作品のタグ</PaneTitle>
        <Button
          variant="inherit"
          type="button"
          onClick={() => {
            const newValue = isAllSelected(currentSelectedTags, tagList)
              ? tagList.map((tag) => tag.tag).join(' ')
              : ''

            setValue('tags', newValue, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }}
        >
          すべて選択
        </Button>
      </PaneHeader>
      <PaneBody>
        {tagList.map((tag) => (
          <Button
            key={tag.tag}
            type="button"
            variant={
              currentSelectedTags.includes(tag.tag) ? 'primary' : 'inherit'
            }
            onClick={() =>
              setValue('tags', toggleTag(currentSelectedTags, tag.tag), {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            {tag.tag}
          </Button>
        ))}
      </PaneBody>
    </Pane>
  )
}

function isAllSelected(currentSelected: string[], tagList: Pixiv.IllustTag[]) {
  for (const tag of tagList) {
    if (!currentSelected.includes(tag.tag)) return false
  }
  return true
}
