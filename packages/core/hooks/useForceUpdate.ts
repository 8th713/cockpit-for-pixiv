import { useState } from 'react'

export function useForceUpdate() {
  const t = useState(undefined)

  return t[1] as () => void
}
