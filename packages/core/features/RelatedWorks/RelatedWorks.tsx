import css from '@styled-system/css'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  createTransition,
  extend,
  Hotkey,
  RefreshIcon,
  themeGet,
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { fetchRelatedIllusts } from '../../externals/apiClient'
import { createCache } from '../../hooks/useCache'
import { useIllust } from '../Illust'
import { useRouteActions, useRouteId } from '../Router'

interface Props {
  illustId: string
  userId: string
}

interface SuccessProps extends Props {
  artworks: Pixiv.RelatedIllusts
}

const THUMBNAIL_SIZE = 168

export const useRelatedIllusts = createCache(fetchRelatedIllusts, 20)

export const RelatedWorks = () => (
  <React.Suspense fallback={null}>
    <IllustLoader />
  </React.Suspense>
)

const IllustLoader = () => {
  const illustId = useRouteId()
  const illust = useIllust(illustId)
  if (!illust) return null
  return <Loader illustId={illustId} userId={illust.userId} />
}

const Loader = (props: Props) => {
  const relatedIllusts = useRelatedIllusts(props.userId)
  if (!relatedIllusts) return <Failure {...props} />
  return <Success key={props.userId} {...props} artworks={relatedIllusts} />
}

const Failure = ({ userId }: Props) => (
  <ScrollView>
    <ThumbnailList>
      <Button sx={{ m: 'auto' }}>
        <RefreshIcon
          sx={{ mr: 2 }}
          onClick={() => useRelatedIllusts.remove(userId)}
        />
        再読み込み
      </Button>
    </ThumbnailList>
  </ScrollView>
)

const Success = ({ illustId, artworks }: SuccessProps) => {
  const root = useRef<HTMLDivElement>(null)
  const selected = useRef<HTMLButtonElement>(null)
  const { push } = useRouteActions()
  const go = (n: number) => {
    const max = artworks.length
    const currentIndex = artworks.findIndex(
      (artwork) => artwork.id === illustId
    )
    n = currentIndex === -1 ? 0 : n
    const targetIndex = (max + currentIndex + n) % max
    const artwork = artworks[targetIndex]
    push(artwork.id)
  }
  const prev = () => go(-1)
  const next = () => go(1)

  useEffect(() => {
    const rootNode = root.current
    if (!rootNode) return
    const selectedNode = selected.current
    if (selectedNode) {
      const offset = rootNode.offsetWidth / 2 - THUMBNAIL_SIZE / 2
      rootNode.scrollLeft = selectedNode.offsetLeft - offset
    } else {
      rootNode.scrollLeft = 0
    }
  }, [illustId])

  return (
    <ScrollView ref={root}>
      <ThumbnailList>
        {artworks.map((artwork, i) => (
          <ThumbnailButton
            key={artwork.id}
            disabled={illustId === artwork.id}
            ref={illustId === artwork.id ? selected : null}
            onClick={() => push(artwork.id)}
          >
            <Thumbnail
              loading="lazy"
              src={artwork.url}
              alt={artwork.title}
              title={artwork.title}
            />
            <Chip>{getChipText(artwork)}</Chip>
          </ThumbnailButton>
        ))}
      </ThumbnailList>
      <Hotkey {...KEY_ASSIGNMENT.goPrevRelatedIllust} action={prev} />
      <Hotkey {...KEY_ASSIGNMENT.goNextRelatedIllust} action={next} />
    </ScrollView>
  )
}

const ScrollView = styled(Box)(
  css({
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    bg: 'surface',
    color: 'onSurface',
  })
)

const ThumbnailList = styled.div(
  extend({
    boxSizing: 'initial',
    display: 'flex',
    height: THUMBNAIL_SIZE,
    px: 2,
    pb: 2,
  })
)

const ThumbnailButton = styled.button(
  extend({
    WebkitAppearance: 'none',
    cursor: 'zoom-in',
    outlineWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    flexShrink: 0,
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    p: 0,
    borderWidth: 0,
    opacity: 'unset',
    ':disabled': {
      cursor: 'default',
      pointerEvents: 'none',
    },
    '::after': {
      content: '""',
      pointerEvents: 'none',
      boxSizing: 'inherit',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      bg: '#fff',
      opacity: 0,
      transition: createTransition('opacity'),
    },
    '&:hover::after': {
      opacity: themeGet('opacities.hover'),
    },
    '&:focus::after': {
      opacity: themeGet('opacities.focus'),
    },
    '&:disabled::after': {
      opacity: themeGet('opacities.disabled'),
    },
    '&+&': {
      ml: 2,
    },
  } as any)
)

const Thumbnail = styled.img(
  extend({
    display: 'block',
    objectFit: 'contain',
  })
)
Thumbnail.defaultProps = {
  width: THUMBNAIL_SIZE,
  height: THUMBNAIL_SIZE,
}

const Chip = styled.span(
  extend({
    position: 'absolute',
    top: 0,
    right: 0,
    px: 2,
    borderBottomLeftRadius: 4,
    bg: 'rgba(0,0,0,0.38)',
    color: 'onSurface',
    ':empty': {
      display: 'none',
    },
  })
)

const getChipText = ({ pageCount, illustType }: Pixiv.SimpleIllust) =>
  pageCount !== 1 ? pageCount : illustType === 2 ? 'U' : null

if (__DEV__) {
  IllustLoader.displayName = 'RelatedWorks.IllustLoader'
  Loader.displayName = 'RelatedWorks.Loader'
  Success.displayName = 'RelatedWorks.Success'
  Failure.displayName = 'RelatedWorks.Failure'
  ScrollView.displayName = 'RelatedWorks.ScrollView'
  ThumbnailList.displayName = 'RelatedWorks.ThumbnailList'
  ThumbnailButton.displayName = 'RelatedWorks.ThumbnailButton'
  Thumbnail.displayName = 'RelatedWorks.Thumbnail'
  Chip.displayName = 'RelatedWorks.Chip'
}
