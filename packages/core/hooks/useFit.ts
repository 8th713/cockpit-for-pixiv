import { useStorage } from './useStorage'
import { FitStatus } from '../constants'

export function useFit(): [FitStatus, () => void] {
  const [status, set] = useStorage('fit', FitStatus.COVER)

  function cycle() {
    set(v => (v + 1) % 3)
  }

  return [status, cycle]
}
