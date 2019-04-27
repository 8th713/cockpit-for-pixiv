import { useStorage } from './useStorage'
import { createUseContext } from './createUseContext'

export const useExpansionContext = createUseContext(function useExpansion() {
  const [opened, set] = useStorage('info', true)

  function toggle(force?: boolean) {
    if (typeof force === 'undefined') {
      set(v => !v)
    } else {
      set(force)
    }
  }

  return [opened, toggle] as const
})
