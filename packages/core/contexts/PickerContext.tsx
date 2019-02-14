import React from 'react'
import { usePicker } from '../hooks'

type PickerAction = ReturnType<typeof usePicker>['actions']
type Props = {
  children?: React.ReactNode
}

const ValueContext = React.createContext<string | null>(null as any)
const ActionContext = React.createContext<PickerAction>(null as any)

export function PickerProvider(props: Props) {
  const { illustId, actions } = usePicker()

  return (
    <ActionContext.Provider value={actions}>
      <ValueContext.Provider value={illustId}>
        {props.children}
      </ValueContext.Provider>
    </ActionContext.Provider>
  )
}
PickerProvider.useIllustId = function useIllustId() {
  return React.useContext(ValueContext)
}
PickerProvider.usePickerAction = function usePickerAction() {
  return React.useContext(ActionContext)
}
