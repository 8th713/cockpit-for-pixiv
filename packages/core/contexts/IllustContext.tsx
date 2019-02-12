import React from 'react'
import { useIllust } from '../hooks'

export const IllustContext = React.createContext<ReturnType<typeof useIllust>>(
  null as any
)
