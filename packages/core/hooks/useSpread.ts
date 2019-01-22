import { useCallback } from 'react'
import { useStorage } from '../hooks'
import { SpreadStatus } from '../constants'

export function useSpread() {
  const [status, set] = useStorage('spread', SpreadStatus.SPREAD)
  const cycle = useCallback(() => set(v => (v + 1) % 3), [])

  return { status, cycle }
}
