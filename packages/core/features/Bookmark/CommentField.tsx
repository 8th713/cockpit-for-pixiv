import React from 'react'
import { TextField } from '../../components'
import { COMMENT_MAX } from './utils'

type Props = {
  value: string
  onChange: (value: { comment: string }) => void
}

export const CommentField = ({ value, onChange }: Props) => (
  <TextField
    label="ブックマークコメント"
    counterText={`${value.length} / ${COMMENT_MAX}`}
    mt={3}
    mb={2}
    type="text"
    name="comment"
    maxLength={COMMENT_MAX}
    value={value}
    onChange={e => onChange({ comment: e.target.value })}
  />
)
