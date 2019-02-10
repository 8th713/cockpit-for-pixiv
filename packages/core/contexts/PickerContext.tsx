import React from 'react'
import { usePicker } from '../hooks'

type Picker = ReturnType<typeof usePicker>

type Props = {
  children?: React.ReactNode
}

const ValueContext = React.createContext<Picker['value']>(null as any)
const ActionContext = React.createContext<Picker['actions']>(null as any)

export function PickerProvider(props: Props) {
  const { value, actions } = usePicker()

  return (
    <ActionContext.Provider value={actions}>
      <ValueContext.Provider value={value}>
        {props.children}
      </ValueContext.Provider>
    </ActionContext.Provider>
  )
}
PickerProvider.ValueContext = ValueContext
PickerProvider.ActionContext = ActionContext
