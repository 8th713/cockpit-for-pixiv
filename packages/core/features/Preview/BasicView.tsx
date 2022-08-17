import { Progress } from '../../shared/Progress'
import { styled } from '../../stitches.config'
import { useFullscreen } from '../App/useFullscreen'
import { useNavigate } from '../App/useNavigate'
import { ErrorDialog } from '../ErrorDialog/ErrorDialog'
import { Info } from '../Info/Info'
import { Video } from '../Video/Video'
import { Image } from './Image'
import { ImageContainer } from './ImageContainer'
import { useStickyImages } from './imagesQuery'
import { Navigation } from './Navigation'
import { PageCount } from './PageCount'
import { ScrollNavigation } from './ScrollNavigation'
import { useScrollReset } from './useScrollReset'

export interface BasicViewProps {
  illustId: string
}

export function BasicView({ illustId }: BasicViewProps) {
  const query = useStickyImages(illustId)
  const navigate = useNavigate()
  const [isFullscreen] = useFullscreen()
  const content = query.isError ? (
    <ImageContainer>
      <ErrorDialog query={query} />
    </ImageContainer>
  ) : !query.images ? (
    <ImageContainer>
      <Progress primary />
    </ImageContainer>
  ) : isMovie(query.images) && !query.isPreviousData ? (
    <ImageContainer>
      <Video illustId={illustId}>
        <Image
          key={query.images[0].urls.original}
          index={0}
          image={query.images[0]}
        />
      </Video>
    </ImageContainer>
  ) : (
    query.images.map((image, index) => (
      <Image key={image.urls.original} index={index} image={image} />
    ))
  )

  useScrollReset('cfp-scrollable', query.images)
  return (
    <Container id="cfp-scrollable" tabIndex={-1} hidden={isFullscreen}>
      <div style={{ position: 'relative' }} onClick={() => navigate()}>
        {content}
        <PageCount hidden={query.isError} />
        {isFullscreen || <ScrollNavigation />}
        <Navigation />
      </div>
      <div id="cfp-bottom-anchor" />
      <Info illustId={illustId} />
    </Container>
  )
}

const Container = styled('div', {
  baseStyle: true,
  overflow: 'auto',
  cover: 0,
  '&[hidden]': {
    display: 'initial',
    opacity: 0,
  },
})

function isMovie(images: Pixiv.Images) {
  return images[0].urls.original.includes('ugoira0')
}
