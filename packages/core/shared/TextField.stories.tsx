import { ComponentMeta } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { TextField, FieldMessage } from './TextField'

export default {
  title: 'Shared/TextField',
  component: TextField,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof TextField>

export const Basic = () => {
  const { control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: { name: '' },
  })

  return <TextField label="名前" name="name" control={control} />
}

export const Options = () => {
  const { control } = useForm({
    mode: 'onChange',
    shouldUseNativeValidation: true,
    defaultValues: { name: '' },
  })

  return (
    <TextField
      label="名前"
      name="name"
      control={control}
      options={{
        maxLength: 5,
        required: true,
      }}
    />
  )
}

export const WithFieldMessage = () => {
  const { control } = useForm({
    mode: 'onChange',
    shouldUseNativeValidation: true,
    defaultValues: { name: '' },
  })

  return (
    <TextField
      label="名前"
      name="name"
      control={control}
      options={{
        maxLength: 5,
        required: true,
      }}
    >
      <FieldMessage>FieldMessage</FieldMessage>
    </TextField>
  )
}
