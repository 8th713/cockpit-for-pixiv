import React from 'react'
import { TextField } from '../../components'
import { TAGS_MAX } from './utils'

type Props = {
  value: string
  count: number
  onChange: (value: { tags: string }) => void
}

export const TagField = ({ value, count, onChange }: Props) => (
  <TextField
    label="ブックマークタグ"
    helperText="スペース区切りで10個まで登録できます。英数字等は半角に統一されます。"
    counterText={`${count} / ${TAGS_MAX}`}
    mt={3}
    mb={2}
    type="text"
    name="tags"
    invalid={count > TAGS_MAX}
    value={value}
    onChange={e => onChange({ tags: e.target.value })}
  />
)
