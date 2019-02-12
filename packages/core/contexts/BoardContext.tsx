import React from 'react'
import { Dimension } from '../interfaces'

type Board = {
  size: Dimension
  node: HTMLDivElement | null
}

export const BoardContext = React.createContext<Board>(null as any)
