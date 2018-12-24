import React from 'react'
import { useIllust } from '../hooks'
import { PickerProvider } from '.'

type Illust = ReturnType<typeof useIllust>

const Value = React.createContext<Illust['result']>(null as any)
const Action = React.createContext<Illust['actions']>(null as any)

function useValue() {
  return React.useContext(Value)
}

function useAction() {
  return React.useContext(Action)
}

type Props = {
  children?: React.ReactNode
}

const IllustProvider = React.memo(function IllustProvider(props: Props) {
  const id = PickerProvider.useValue()
  const { result, actions } = useIllust(id!)

  return (
    <Action.Provider value={actions}>
      <Value.Provider value={result}>{props.children}</Value.Provider>
    </Action.Provider>
  )
})

const Context = Object.assign(IllustProvider, { useValue, useAction })

export { Context as IllustProvider }
