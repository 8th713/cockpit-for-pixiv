import { SpreadStatus } from '../constants'
import { useStorage } from '../hooks'

export function useSpread(): [SpreadStatus, () => void] {
  const [status, set] = useStorage('spread', SpreadStatus.SPREAD)

  function cycle() {
    set(v => (v + 1) % 3)
  }

  return [status, cycle]
}
