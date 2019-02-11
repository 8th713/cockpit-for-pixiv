import { useCallback } from 'react'
import { useStorage } from './useStorage'
import { FitStatus } from '../constants'

export function useFit(): [FitStatus, () => void] {
  const [status, set] = useStorage('fit', FitStatus.COVER)
  const cycle = useCallback(() => set(v => (v + 1) % 3), [])

  return [status, cycle]
}
