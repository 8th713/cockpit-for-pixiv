import { FitStatus } from '../constants'
import { useStorage } from './useStorage'
import { createUseContext } from './createUseContext'

export const useFitContext = createUseContext(function useFit(): [
  FitStatus,
  () => void
] {
  const [status, set] = useStorage('fit', FitStatus.COVER)

  function cycle() {
    set(v => (v + 1) % 3)
  }

  return [status, cycle]
})
