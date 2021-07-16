import { Control, useWatch } from 'react-hook-form'
import { TextField } from '../../../shared/TextField'

export interface CommentCountProps {
  maxLength: number
  name: string
  control: Control<any>
}

export function CommentCount({ name, control, maxLength }: CommentCountProps) {
  const value: string = useWatch({ name, control })

  return (
    <TextField.Message css={{ paddingX: '$2', textAlign: 'right' }}>
      {value.length}/{maxLength}
    </TextField.Message>
  )
}
