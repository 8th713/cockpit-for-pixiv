import React from 'react'
import { useSort } from '../hooks'
import { Column, Direction } from '../interfaces'

type Sort = ReturnType<typeof useSort>

const Value = React.createContext<Sort>({
  column: Column.TOTAL,
  direction: Direction.ASC,
  sortByName: () => {},
  sortByTotal: () => {}
})

function useValue() {
  return React.useContext(Value)
}

type Props = {
  children?: React.ReactNode
}

function SortProvider(props: Props) {
  const value = useSort()

  return <Value.Provider value={value}>{props.children}</Value.Provider>
}

const Context = Object.assign(SortProvider, { useValue })

export { Context as SortProvider }
