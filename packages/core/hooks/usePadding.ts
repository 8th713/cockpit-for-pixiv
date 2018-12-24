import { useStorage } from '.'

export function usePadding() {
  const [value, set] = useStorage('padding', 32)

  return { value, set }
}
