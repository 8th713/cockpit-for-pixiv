import { useToggle } from '../hooks'
import { createProvider } from './utlis'

export const AboutProvider = createProvider(function useAbout() {
  return useToggle(false)
}, 'AboutProvider')
