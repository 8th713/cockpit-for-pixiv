import React, { useContext } from 'react'
import { useIllust } from '../hooks'
import { PickerProvider } from './PickerContext'

type Illust = ReturnType<typeof useIllust>

type Props = {
  children?: React.ReactNode
}

const Context = React.createContext<Illust>(null as any)

export function IllustProvider(props: Props) {
  const id = useContext(PickerProvider.ValueContext)
  const context = useIllust(id!)

  return <Context.Provider value={context}>{props.children}</Context.Provider>
}
IllustProvider.Context = Context
