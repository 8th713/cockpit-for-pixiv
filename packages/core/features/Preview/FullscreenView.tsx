import { Progress } from '../../shared/Progress'
import { styled } from '../../stitches.config'
import { useUpdateFullscreen } from '../App/useFullscreen'
import { ErrorDialog } from '../ErrorDialog/ErrorDialog'
import { Video } from '../Video/Video'
import { ImageContainer } from './ImageContainer'
import { useStickyImages } from './imagesQuery'
import { PageCount } from './PageCount'
import { ScrollNavigation } from './ScrollNavigation'
import { useNodeList } from './useNodeList'
import { useCurrentElement } from './useScrollObserver'
import { useScrollReset } from './useScrollReset'

export interface FullscreenViewProps {
  illustId: string
}

export function FullscreenView({ illustId }: FullscreenViewProps) {
  const updateFullscreen = useUpdateFullscreen()
  const query = useStickyImages(illustId)
  const nodes = useNodeList()
  const element = useCurrentElement()
  const index = nodes.get(element!)!
  const image = query.images && query.images[index]
  const imgElement = image && (
    <Img
      src={image.urls.original}
      width={image.width}
      height={image.height}
      onClick={() => updateFullscreen(false)}
    />
  )

  const content = query.isError ? (
    <ImageContainer>
      <ErrorDialog query={query} />
    </ImageContainer>
  ) : !query.images ? (
    <ImageContainer>
      <Progress primary />
    </ImageContainer>
  ) : isMovie(query.images) && !query.isPreviousData ? (
    <ImgWrapper>
      <Video fullscreenMode illustId={illustId}>
        {imgElement}
      </Video>
    </ImgWrapper>
  ) : (
    <ImgWrapper>{imgElement}</ImgWrapper>
  )

  useScrollReset('cfp-scrollable-fullscreen', image)
  return (
    <Container id="cfp-scrollable-fullscreen">
      <Inner>
        {content}
        <PageCount hidden={query.isError} />
        <ScrollNavigation />
      </Inner>
    </Container>
  )
}

const Container = styled('div', {
  baseStyle: true,
  cover: 0,
  position: 'fixed',
  overflow: 'auto',
})

const Inner = styled('div', {
  baseStyle: true,
  position: 'relative',
  size: 'fit-content',
  minWidth: '100%',
  minHeight: '100%',
})

const ImgWrapper = styled('div', {
  pointerEvents: 'none',
  boxSizing: 'border-box',
  display: 'flex',
  minHeight: '100vh',
  padding: '$5',
})

const Img = styled('img', {
  pointerEvents: 'auto',
  cursor: 'zoom-out',
  display: 'block',
  margin: 'auto',
})

function isMovie(images: Pixiv.Images) {
  return images[0].urls.original.includes('ugoira0')
}
