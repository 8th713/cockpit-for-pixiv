import { useStorage } from './useStorage'
import { createUseContext } from './createUseContext'

export const usePaddingContext = createUseContext(function usePadding() {
  return useStorage('padding', 32)
})
