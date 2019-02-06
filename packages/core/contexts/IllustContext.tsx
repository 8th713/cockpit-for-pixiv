import React from 'react'
import { useIllust } from '../hooks'
import { PickerProvider } from './PickerContext'

type Illust = ReturnType<typeof useIllust>

const IllustContext = React.createContext<Illust>(null as any)

function useValue() {
  return React.useContext(IllustContext)
}

type Props = {
  children?: React.ReactNode
}

function IllustProvider(props: Props) {
  const id = PickerProvider.useValue()
  const context = useIllust(id!)

  return (
    <IllustContext.Provider value={context}>
      {props.children}
    </IllustContext.Provider>
  )
}

const Context = Object.assign(IllustProvider, { useValue })

export { Context as IllustProvider }
