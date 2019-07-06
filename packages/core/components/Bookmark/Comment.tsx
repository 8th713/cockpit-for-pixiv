import React from 'react'
import { TextField } from '../shared/TextField'

type Props = {
  value: string
  onChange: (value: { comment: string }) => void
}

const MAX_LENGTH = 140

export function Comment({ value, onChange }: Props) {
  return (
    <TextField
      label="ブックマークコメント"
      counterText={`${value.length} / ${MAX_LENGTH}`}
      margin
      type="text"
      name="comment"
      maxLength={MAX_LENGTH}
      value={value}
      onChange={e => onChange({ comment: e.target.value })}
    />
  )
}
