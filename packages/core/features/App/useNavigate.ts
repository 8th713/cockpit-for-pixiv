import { atom, useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useMemo } from 'react'
import { useUpdateFullscreen } from './useFullscreen'
import { usePrefetch } from './usePrefetch'
import { getId, getSibling, toggleWindowScrollBar } from './utils'

export type Navigate = ReturnType<typeof useNavigate>

const currentIdAtom = atom<string | null>(null)
const currentTargetAtom = atom<{ current: HTMLAnchorElement | null }>({
  current: null,
})

export function useRouteId() {
  return useAtom(currentIdAtom)[0]
}

/**
 * 以下の行動で currentId が変わる
 *
 * - サムネイルをから選択される
 *   - setByElement
 * - ショートカットキーで「次/前の作品に移動」を実行
 *   - go -> setByElement
 *   * currentTarget を更新する
 *   * フルスクリーンを解除する
 *   * グローバルスクロールバーを隠す
 *   * 選択されたサムネイルが画面中央に来るようにスクロールする
 * - RecentWorkから選択される
 *   - push
 * - ショートカットキーで「表示中の作者の次/前の作品に移動」を実行
 *   - push
 *   * フルスクリーンを解除する
 *   * currentTarget は更新しない
 *   * グローバルスクロールバーはすでに隠れているため変更しない
 * - ダイアログを閉じる
 *   - unset
 *   * currentTarget を null にする
 *   * フルスクリーンを解除する
 *   * グローバルスクロールバーをもとに戻す
 */
/**
 * ナビゲート関数を返します
 */
export function useNavigate() {
  const toggleFullscreen = useUpdateFullscreen()
  const currentTargetRef = useAtomValue(currentTargetAtom)
  const prefetch = usePrefetch()
  const setId = useUpdateAtom(currentIdAtom)

  return useMemo(() => {
    const setByElement = (element: HTMLAnchorElement) => {
      const id = getId(element)

      currentTargetRef.current = element
      prefetch(id)
      toggleWindowScrollBar(true)
      setId(id)
      toggleFullscreen(false)
      requestAnimationFrame(() => {
        element.scrollIntoView({
          block: 'center',
          inline: 'center',
        })
      })
    }
    const go = (n: number) => {
      if (!currentTargetRef.current) return

      const element = getSibling(currentTargetRef.current, n)

      setByElement(element)
    }
    const unset = () => {
      currentTargetRef.current = null
      setId(null)
      toggleWindowScrollBar(false)
      toggleFullscreen(false)
    }
    const push = (id: string) => {
      prefetch(id)
      setId(id)
      toggleFullscreen(false)
    }

    function navigate(): void
    function navigate(value: 1 | -1): void
    function navigate(value: string): void
    function navigate(value: HTMLAnchorElement): void
    function navigate(value?: unknown) {
      if (value instanceof HTMLAnchorElement) {
        return setByElement(value)
      }

      switch (typeof value) {
        case 'undefined': {
          return unset()
        }
        case 'number': {
          return go(value)
        }
        case 'string': {
          return push(value)
        }
      }
    }

    return navigate
  }, [currentTargetRef, setId, prefetch])
}
