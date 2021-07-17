import { useCallback } from 'react'
import { Img } from '../../../shared/Img'
import { useSetIsFullSize } from '../previewState'
import { ImageListUgoira } from './ImageListUgoira'
import { useLazyLoad } from './useLazyLoad'
import { useResize } from './useResize'

export interface ImageListItemProps extends Pixiv.Page {
  id: string
}

export function ImageListItem(props: ImageListItemProps) {
  const { on } = useSetIsFullSize()
  const setLazy = useLazyLoad(props.urls.original)
  const setResize = useResize(props.width, props.height)
  const ref = useCallback(
    (element: HTMLImageElement | null) => {
      const root = element?.parentElement

      setResize(setLazy(element), root)
    },
    [setLazy, setResize]
  )
  const isUgoira = props.urls.original.includes('ugoira0')
  const close = (e: React.MouseEvent) => {
    e.stopPropagation()
    on()
  }

  return isUgoira ? (
    <ImageListUgoira {...props} onClick={close} />
  ) : (
    <Img
      ref={ref}
      loading="lazy"
      src={props.urls.original}
      onClick={close}
      css={{
        cursor: 'zoom-in',
        objectFit: 'contain',
        display: 'block',
        maxHeight: '100%',
        margin: 'auto',
      }}
    />
  )
}
