import { useStorage } from './useStorage'

export function useExpansion(): [boolean, (force?: boolean) => void] {
  const [opened, set] = useStorage('info', true)
  function toggle(force?: boolean) {
    if (typeof force === 'undefined') {
      set(v => !v)
    } else {
      set(force)
    }
  }

  return [opened, toggle]
}
