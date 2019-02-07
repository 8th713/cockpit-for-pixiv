import { RefObject, useEffect, useState } from 'react'

export function useIntersection(
  node: RefObject<Element>,
  options: IntersectionObserverInit
) {
  const [entry, set] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    const element = node.current

    if (!element) return

    const observer = new IntersectionObserver(([entry]) => set(entry), options)

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [node.current])

  return entry
}
