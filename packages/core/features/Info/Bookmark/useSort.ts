import { useAtom } from 'jotai'
import { atomWithReducer } from 'jotai/utils'
import { useMemo } from 'react'
import { SortAscIcon, SortDescIcon } from '../../../shared/Icon'

type Column = 'total' | 'name'
type Direction = '↓' | '↑'

const PREFIX = 'cockpit'

const load = <T>(storage: Storage, key: string, defaultValue: T): T => {
  const value = storage.getItem(`${PREFIX}/${key}`)

  if (value !== null) {
    try {
      return JSON.parse(value)
    } catch (err) {
      console.error(err)
      return defaultValue
    }
  }
  return defaultValue
}

const store = <T>(storage: Storage, key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value)

  storage.setItem(`${PREFIX}/${key}`, stringifiedValue)
}

const columnAtom = atomWithReducer(
  load<Column>(localStorage, 'sortColumn', 'total'),
  (current, _?: undefined) => {
    const value: Column = current === 'name' ? 'total' : 'name'

    store(localStorage, 'sortColumn', value)
    return value
  }
)

const directionAtom = atomWithReducer(
  load<Direction>(localStorage, 'sortDirection', '↓'),
  (current, _?: undefined) => {
    const value: Direction = current === '↑' ? '↓' : '↑'

    store(localStorage, 'sortDirection', value)
    return value
  }
)

export function useSort(items: Pixiv.MyTag[]) {
  const [column, toggleColumn] = useAtom(columnAtom)
  const [direction, toggleDirection] = useAtom(directionAtom)

  return useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const aValue = a[column]!
      const bValue = b[column]!

      if (aValue < bValue) return 1
      if (aValue > bValue) return -1
      return 0
    })
    const tags = direction === '↓' ? sorted : sorted.reverse()

    return [
      tags,
      {
        columnProps: {
          children: column === 'name' ? '名前' : '使用回数',
          onClick: toggleColumn,
        },
        directionProps: {
          icon: direction === '↑' ? SortAscIcon : SortDescIcon,
          onClick: toggleDirection,
        },
      },
    ] as const
  }, [items, column, toggleColumn, direction, toggleDirection])
}
