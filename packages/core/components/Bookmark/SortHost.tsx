import React, { useContext, useDebugValue, useMemo } from 'react'
import { useStorage } from '../../hooks/useStorage'
import { Column, Direction } from './utils'

type Props = {
  children?: React.ReactNode
}

const NO_PROVIDER = 'Missing SortHost'
const ValueContext = React.createContext<
  | {
      column: Column
      direction: Direction
      sortByTotal: () => void
      sortByName: () => void
    }
  | typeof NO_PROVIDER
>(NO_PROVIDER)

export function useSort() {
  const value = useContext(ValueContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  useDebugValue(value[0])
  return value
}

export function SortHost({ children }: Props) {
  const [column, setColumn] = useStorage<Column>('sortColumn', 'total')
  const [direction, setDirection] = useStorage<Direction>('sortDirection', '↑')
  const value = useMemo(() => {
    const sortBy = (type: Column) =>
      type === column
        ? setDirection(direction === '↑' ? '↓' : '↑')
        : setColumn(type)
    const sortByTotal = () => sortBy('total')
    const sortByName = () => sortBy('name')

    return { column, direction, sortByTotal, sortByName }
  }, [column, direction, setColumn, setDirection])

  return <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
}
