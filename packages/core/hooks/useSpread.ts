import { SpreadStatus } from '../constants'
import { useStorage } from '../hooks'
import { createUseContext } from './createUseContext'

export const useSpreadContext = createUseContext(function useSpread() {
  const [status, set] = useStorage('spread', SpreadStatus.SPREAD)

  function cycle() {
    set(v => (v + 1) % 3)
  }

  return [status, cycle] as const
})
