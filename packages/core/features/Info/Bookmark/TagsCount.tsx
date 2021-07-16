import { Control } from 'react-hook-form'
import { Flex } from '../../../shared/Box'
import { TextField } from '../../../shared/TextField'
import { useWatchTags } from './utils'

export interface TagsCountProps {
  maxLength: number
  name: string
  control: Control<any>
}

export function TagsCount({ control, maxLength }: TagsCountProps) {
  const tags = useWatchTags(control)

  return (
    <Flex css={{ paddingX: '$2', gap: '$2' }}>
      <TextField.Message noWrap css={{ flexGrow: 1 }}>
        スペース区切りで10個まで登録できます。英数字等は半角に統一されます。
      </TextField.Message>
      <TextField.Message css={{ flexShrink: 0, textAlign: 'right' }}>
        {tags.length}/{maxLength}
      </TextField.Message>
    </Flex>
  )
}
