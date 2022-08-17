import { Control, useWatch, ValidationRule } from 'react-hook-form'
import { FieldMessage, TextField } from '../../shared/TextField'

export interface CommentFieldProps {
  control: Control<Pixiv.BookmarkState>
}

const NAME = 'comment'
const COMMENT_LENGTH = 140
const validateComment: ValidationRule<string | number> = {
  value: COMMENT_LENGTH,
  message: `コメントが長すぎます。${COMMENT_LENGTH}字以内にしてください`,
}

export function CommentField({ control }: CommentFieldProps) {
  return (
    <TextField
      label="ブックマークコメント"
      name={NAME}
      control={control}
      options={{ maxLength: validateComment }}
    >
      <CommentCount control={control} />
    </TextField>
  )
}

function CommentCount({ control }: CommentFieldProps) {
  const comment = useWatch({ control, name: NAME })

  return (
    <FieldMessage css={{ flexShrink: 0, textAlign: 'right' }}>
      {comment.length}/{COMMENT_LENGTH}
    </FieldMessage>
  )
}
