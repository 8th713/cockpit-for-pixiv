import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const selectedAtom = atom<Element | null>(null)
const ioOptions: IntersectionObserverInit = { threshold: 0.5 }

export function useScrollObserver() {
  const setElement = useUpdateAtom(selectedAtom)

  return (element: Element) => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setElement(element)
      }
    }, ioOptions)

    io.observe(element)

    return () => {
      io.disconnect()
    }
  }
}

export function useCurrentElement() {
  return useAtom(selectedAtom)[0]
}
