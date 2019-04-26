import { useElementSize } from './useElementSize'
import { usePaddingContext } from './usePadding'
import { createUseContext } from './createUseContext'

export const useBoardContext = createUseContext(function useBoard() {
  const [padding] = usePaddingContext()

  return useElementSize(padding)
})
