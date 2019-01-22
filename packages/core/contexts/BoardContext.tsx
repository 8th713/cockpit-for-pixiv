import React from 'react'
import { useBoardSize } from '../hooks'
import { PaddingProvider } from './PaddingContext'

type Board = ReturnType<typeof useBoardSize>

const Value = React.createContext<Board>({
  width: 0,
  height: 0,
  ref: React.createRef()
})

function useValue() {
  return React.useContext(Value)
}

type Props = {
  observe: React.RefObject<HTMLElement>
  children?: React.ReactNode
}

function BoardProvider(props: Props) {
  const padding = PaddingProvider.useValue()
  const value = useBoardSize(props.observe, padding)

  return <Value.Provider value={value}>{props.children}</Value.Provider>
}

const Context = Object.assign(BoardProvider, { useValue })

export { Context as BoardProvider }
