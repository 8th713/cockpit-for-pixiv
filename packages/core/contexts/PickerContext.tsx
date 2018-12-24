import React from 'react'
import { usePicker } from '../hooks'

type Picker = ReturnType<typeof usePicker>

const Value = React.createContext<Picker['value']>(null as any)
const Action = React.createContext<Picker['actions']>(null as any)

function useValue() {
  return React.useContext(Value)
}

function useAction() {
  return React.useContext(Action)
}

type Props = {
  children?: React.ReactNode
}

const PickerProvider = React.memo(function PickerProvider(props: Props) {
  const { value, actions } = usePicker()

  return (
    <Action.Provider value={actions}>
      <Value.Provider value={value}>{props.children}</Value.Provider>
    </Action.Provider>
  )
})

const Context = Object.assign(PickerProvider, { useValue, useAction })

export { Context as PickerProvider }
