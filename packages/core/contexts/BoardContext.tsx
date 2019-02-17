import { useElementSize } from '../hooks'
import { PaddingProvider } from './PaddingContext'
import { createProvider } from './utlis'

export const BoardProvider = createProvider(function useBoard() {
  const [padding] = PaddingProvider.use()

  return useElementSize(padding)
}, 'BoardProvider')
