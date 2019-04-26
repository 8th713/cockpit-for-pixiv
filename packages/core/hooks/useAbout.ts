import { useToggle } from './useToggle'
import { createUseContext } from './createUseContext'

export const useAboutContext = createUseContext(function useAbout() {
  return useToggle(false)
})
