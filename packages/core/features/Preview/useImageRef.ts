import { useRefCallback } from '../../shared/useRefCallback'
import { lazyLoad } from './useLazyLoad'
import { useRegistryNode } from './useNodeList'
import { useScrollObserver } from './useScrollObserver'

/**
 * 画像の遅延ロード、スクロール監視、リストへの追加
 */
export function useImageRef(
  index: number,
  image: Pixiv.Image
): React.RefCallback<HTMLDivElement> {
  const observeIntersection = useScrollObserver()
  const registryNode = useRegistryNode(index)

  return useRefCallback(
    (node) => {
      const cleanups = [
        lazyLoad(node),
        observeIntersection(node),
        registryNode(node),
      ]

      return () => {
        cleanups.map((cleanup) => cleanup && cleanup())
      }
    },
    [index, image]
  )
}
