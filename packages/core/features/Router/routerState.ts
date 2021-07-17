import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { MutableRefObject, useMemo } from 'react'
import { useSetIsFullSize } from '../Preview/previewState'
import { usePrefetch } from './prefetch'
import { getId, getSibling, toggleWindowScrollBar } from './utils'

const idAtom = atom<string | null>(null)
const targetAtom = atom<MutableRefObject<Element | null>>({ current: null })

export function useRouteId() {
  return useAtomValue(idAtom)
}

export function useNavigate() {
  const ref = useAtomValue(targetAtom)
  const prefetch = usePrefetch()
  const setId = useUpdateAtom(idAtom)
  const fullSize = useSetIsFullSize()

  return useMemo(() => {
    const setByElement = (element: HTMLAnchorElement) => {
      const id = getId(element)

      ref.current = element
      prefetch(id)
      toggleWindowScrollBar(true)
      setId(id)
      fullSize.off()
      requestAnimationFrame(() => {
        element.scrollIntoView({
          block: 'center',
          inline: 'center',
        })
      })
    }
    const go = (n: number) => {
      if (!ref.current) return
      const element = getSibling(ref.current, n)
      setByElement(element)
    }
    const goNext = () => go(1)
    const goPrev = () => go(-1)
    const unset = () => {
      ref.current = null
      setId(null)
      toggleWindowScrollBar(false)
    }
    const push = (id: string) => {
      prefetch(id)
      setId(id)
    }

    return {
      go,
      goNext,
      goPrev,
      unset,
      push,
      setByElement,
    }
  }, [ref, setId, prefetch, fullSize])
}
