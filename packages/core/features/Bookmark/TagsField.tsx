import { Control, useWatch } from 'react-hook-form'
import { FieldMessage, TextField } from '../../shared/TextField'
import { splitTags } from './splitTags'

export interface TagsFieldProps {
  control: Control<Pixiv.BookmarkState>
}

const NAME = 'tags'
const TAG_LENGTH = 20
const TAG_AMOUNT = 10

export function TagsField({ control }: TagsFieldProps) {
  return (
    <TextField
      label="ブックマークコメント"
      name={NAME}
      control={control}
      options={{ validate }}
    >
      <TagsCount control={control} />
    </TextField>
  )
}

function TagsCount({ control }: TagsFieldProps) {
  const value = useWatch({ control, name: NAME })
  const tags = splitTags(value)

  return (
    <FieldMessage css={{ flexShrink: 0, textAlign: 'right' }}>
      {tags.length}/{TAG_AMOUNT}
    </FieldMessage>
  )
}

function validate(tags: string) {
  const tagList = splitTags(tags)

  if (tagList.length > TAG_AMOUNT) {
    return `タグが多すぎます。タグは${TAG_AMOUNT}個以内にしてください`
  }
  for (const tag of tagList) {
    if (tag.length > TAG_LENGTH) {
      return `タグ「${tag}」は長すぎます。${TAG_LENGTH}文字以内にしてください`
    }
  }
  return true
}
