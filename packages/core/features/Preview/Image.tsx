import { styled } from '../../stitches.config'
import { useUpdateFullscreen } from '../App/useFullscreen'
import { ImageContainer } from './ImageContainer'
import { useImageRef } from './useImageRef'

export interface ImageProps {
  index: number
  image: Pixiv.Image
}

export function Image({ index, image }: ImageProps) {
  const ref = useImageRef(index, image)
  const updateFullscreen = useUpdateFullscreen()
  const { urls, width, height } = image

  return (
    <ImageContainer ref={ref}>
      <Img
        loading="lazy"
        src={urls.original}
        style={{
          maxWidth: `min(100%,${width}px)`,
          aspectRatio: `${width} / ${height}`,
        }}
        onClick={(e) => {
          e.stopPropagation()
          updateFullscreen(true)
        }}
      />
    </ImageContainer>
  )
}

const Img = styled('img', {
  pointerEvents: 'auto',
  cursor: 'zoom-in',
  objectFit: 'contain',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  minWidth: 0,
  minHeight: 0,
  margin: 'auto',
  backgroundColor: 'rgba(255,255,255,0.32)',
})
