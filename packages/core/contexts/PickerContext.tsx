import React from 'react'
import { usePicker } from '../hooks'

type PickerAction = ReturnType<typeof usePicker>['actions']

export const PickerValueContext = React.createContext<string>(null as any)
export const PickerActionContext = React.createContext<PickerAction>(
  null as any
)
