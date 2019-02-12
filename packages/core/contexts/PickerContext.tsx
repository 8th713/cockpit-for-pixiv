import React from 'react'
import { usePicker } from '../hooks'

type Picker = ReturnType<typeof usePicker>

export const PickerValueContext = React.createContext<string>(null as any)
export const PickerActionContext = React.createContext<Picker['actions']>(
  null as any
)
