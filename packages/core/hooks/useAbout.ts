import { useToggle } from '../hooks'

export function useAbout() {
  const [opened, toggle] = useToggle(false)

  return { opened, toggle }
}
