import { useCallback } from 'react'
import { useStorage } from '.'
import { FitStatus } from '../interfaces'

export function useFit() {
  const [status, set] = useStorage('fit', FitStatus.COVER)
  const cycle = useCallback(() => set(v => (v + 1) % 3), [])

  return { status, cycle }
}
