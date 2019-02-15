import { useIllust as useIllustInternal } from '../hooks'
import { PickerProvider } from './PickerContext'
import { createProvider } from './utlis'

export const IllustProvider = createProvider(function useIllust() {
  const { illustId } = PickerProvider.use()

  return useIllustInternal(illustId!)
}, 'IllustProvider')
