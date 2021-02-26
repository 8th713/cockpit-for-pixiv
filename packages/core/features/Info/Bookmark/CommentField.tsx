import { useWatch } from 'react-hook-form'
import { TextField } from '../../../shared/TextField'
import { FormFieldProps } from './utils'

export interface CommentFieldProps extends FormFieldProps {}

const COMMENT_MAX = 140

export const CommentField = ({
  control,
  register,
  errors,
}: CommentFieldProps) => {
  const comment = useWatch<string>({ control, name: 'comment' }) || ''
  const count = comment.length

  return (
    <TextField
      ref={register({
        maxLength: COMMENT_MAX,
      })}
      name="comment"
      label="ブックマークコメント"
      invalid={!!errors.comment}
      counter={`${count}/${COMMENT_MAX}`}
    />
  )
}
