import React from 'react'
import { TextField } from '../../../shared/TextField'
import { FormFieldProps, splitTags, useWatchTags } from './utils'

export interface TagsFieldProps extends FormFieldProps {}

const TAGS_MAX = 10

export const TagsField = ({ control, register, errors }: TagsFieldProps) => {
  const fieldTags = useWatchTags(control)
  const count = fieldTags.length

  return (
    <TextField
      css={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: '$surface',
      }}
      ref={register({
        validate: (value: string) => splitTags(value).length <= TAGS_MAX,
      })}
      name="tags"
      label="ブックマークタグ"
      message="スペース区切りで10個まで登録できます。英数字等は半角に統一されます。"
      counter={`${count}/${TAGS_MAX}`}
      invalid={!!errors.tags}
    />
  )
}
