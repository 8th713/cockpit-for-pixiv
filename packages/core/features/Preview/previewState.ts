import { atom, Getter, Setter, useAtom } from 'jotai'
import { useAtomCallback, useUpdateAtom } from 'jotai/utils'
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'

const fullSizeAtom = atom(false)
const elementsAtom = atom<HTMLElement[]>([])
const selectedElementAtom = atom<HTMLElement | null>(null)

export function useIsFullSize() {
  return useAtom(fullSizeAtom)[0]
}

const offCallback = (get: Getter, set: Setter) => {
  const isFullSize = get(fullSizeAtom)
  const element = get(selectedElementAtom)

  if (isFullSize && element) {
    element.scrollIntoView()
  }
  set(fullSizeAtom, false)
}
const toggleCallback = (get: Getter, set: Setter) => {
  const isFullSize = get(fullSizeAtom)
  const element = get(selectedElementAtom)

  if (isFullSize && element) {
    element.scrollIntoView()
  }
  set(fullSizeAtom, !isFullSize)
}

export function useSetIsFullSize() {
  const set = useUpdateAtom(fullSizeAtom)
  const off = useAtomCallback(offCallback)
  const toggle = useAtomCallback(toggleCallback)

  return useMemo(
    () => ({
      on: () => set(true),
      off,
      toggle,
    }),
    [set, off, toggle]
  )
}

export function useWatch() {
  const listRef = useRef<HTMLElement[]>([])
  const observerRef = useRef<IntersectionObserver>()
  const setList = useUpdateAtom(elementsAtom)
  const select = useUpdateAtom(selectedElementAtom)
  const refCallback = useCallback(
    (element: HTMLElement | null) => {
      const list = listRef.current

      if (element) {
        const observer =
          observerRef.current ||
          new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  select(entry.target as any)
                }
              }
            },
            { threshold: 0.5 }
          )

        list.push(element)
        observer.observe(element)
        observerRef.current = observer
      } else {
        const element = list.pop()
        const observer = observerRef.current

        if (observer && element) {
          observer.unobserve(element)
        }
      }
    },
    [select]
  )

  useLayoutEffect(() => {
    setList(listRef.current)
    return () => {
      if (observerRef.current) {
        const observer = observerRef.current

        observer.disconnect()
        observerRef.current = undefined
      }
      listRef.current = []
      setList([])
    }
  }, [setList, select])
  return refCallback
}

export function useItems() {
  return useAtom(elementsAtom)[0]
}

export function useSelected() {
  return useAtom(selectedElementAtom)
}
