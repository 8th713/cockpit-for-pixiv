import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useMemo } from 'react'
import { SortAscIcon, SortDescIcon } from '../../shared/Icons'

type Column = 'total' | 'name'
type Direction = '↓' | '↑'

const columnAtom = atomWithStorage<Column>('cockpit/sortColumn', 'total')
const directionAtom = atomWithStorage<Direction>('cockpit/sortDirection', '↓')

export function useSort(items: Pixiv.MyTag[]) {
  const [column, setColumn] = useAtom(columnAtom)
  const [direction, setDirection] = useAtom(directionAtom)

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
          onClick: () =>
            setColumn((value) => (value === 'name' ? 'total' : 'name')),
        },
        directionProps: {
          icon: direction === '↑' ? SortAscIcon : SortDescIcon,
          onClick: () => setDirection((value) => (value === '↑' ? '↓' : '↑')),
        },
      },
    ] as const
  }, [items, column, setColumn, direction, setDirection])
}
