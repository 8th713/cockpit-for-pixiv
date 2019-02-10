import React, { useContext } from 'react'
import { useBoardSize } from '../hooks'
import { PaddingProvider } from './PaddingContext'

type Board = ReturnType<typeof useBoardSize>
type Props = {
  observe: React.RefObject<HTMLElement>
  children?: React.ReactNode
}

const ValueContext = React.createContext<Board>({
  width: 0,
  height: 0,
  node: React.createRef()
})

export function BoardProvider(props: Props) {
  const padding = useContext(PaddingProvider.ValueContext)
  const value = useBoardSize(props.observe, padding)

  return (
    <ValueContext.Provider value={value}>
      {props.children}
    </ValueContext.Provider>
  )
}
BoardProvider.ValueContext = ValueContext
