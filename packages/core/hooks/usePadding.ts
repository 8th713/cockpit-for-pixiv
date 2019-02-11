import { useStorage } from './useStorage'

export function usePadding() {
  return useStorage('padding', 32)
}
