import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { createRef, RefObject, useCallback } from 'react'
import { createAddonStore } from '../../externals/addonStore'

type ElementRef = RefObject<HTMLElement>

const refAtom = atom<ElementRef>(createRef<HTMLElement>())

const addonAtom = atom(createAddonStore())

export function useAddon() {
  return useAtomValue(addonAtom)
}

export function useBottomAnchor() {
  return useAtomValue(refAtom)
}

export function useScrollBottomAnchor(behavior: 'smooth' | 'auto' = 'smooth') {
  const ref = useBottomAnchor()

  return useCallback(() => {
    if (!ref.current) return
    if (isInView(ref.current)) return
    ref.current.scrollIntoView({
      behavior,
      block: 'start',
    })
  }, [behavior, ref])
}

export function useIsInViewBottomAnchor() {
  const ref = useBottomAnchor()

  return useCallback(() => {
    if (!ref.current) return false
    return isInView(ref.current)
  }, [ref])
}

const isInView = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()

  return rect.top < window.innerHeight - 56
}
