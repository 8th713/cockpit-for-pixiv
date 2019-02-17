import { useEffect, useState } from 'react'

type RefCallback<E> = (node: E | null) => void

export function useVisibility<E extends Element>(
  options: IntersectionObserverInit = {}
): [RefCallback<E>, boolean, IntersectionObserverEntry | null] {
  const [node, ref] = useState<E | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const inView = entry ? entry.isIntersecting : false

  useEffect(() => {
    if (node === null) return

    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      options
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node])

  return [ref, inView, entry]
}
