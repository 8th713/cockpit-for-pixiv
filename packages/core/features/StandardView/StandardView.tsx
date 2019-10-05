import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  Dialog,
  Progress,
  RefreshIcon,
  Paragraph,
  extend,
  themeGet
} from '../../components'
import { useFullSizeMode } from '../FullSizeView'
import { useIObserver } from '../IntersectionObserver'
import { usePages } from '../Pages'
import { GoNextButton, GoPreviousButton, useRouteActions } from '../Router'
import { OverLay, ScrollSpy } from '../ScrollSpy'
import { isUgoira } from '../Ugoira'
import { PADDING, StandardImg } from './StandardImg'
import { StandardUgoira } from './StandardUgoira'

interface Props {
  illustId: string
}

interface SuspenseProps extends Props {
  children?: React.ReactNode
}

interface SuccessProps {
  pages: Pixiv.Pages
}

export const StandardView = ({ illustId, children }: SuspenseProps) => {
  const root = useRef<HTMLDivElement>(null)
  const { unset } = useRouteActions()
  const [isFullSize, setFullSize] = useFullSizeMode()
  const observer = useIObserver()

  // 作品を移動したら先頭までスクロールしてフォーカス
  useEffect(() => {
    setFullSize(false)
    const node = root.current
    if (!node) return
    node.scroll(0, 0)
    node.focus()
  }, [illustId, setFullSize])
  // フルサイズモードから戻ったらルートにフォーカス
  useEffect(() => {
    if (isFullSize) return
    const node = root.current
    if (!node) return
    node.focus()
  }, [isFullSize])
  // Start lazy loading
  useEffect(
    () =>
      observer.start({
        root: root.current,
        rootMargin: '50%'
      }),
    [observer]
  )

  return (
    <Root ref={root} tabIndex={0} hidden={isFullSize}>
      <Box sx={{ userSelect: 'none', position: 'relative' }}>
        <span onClick={unset}>
          <React.Suspense fallback={<Loading />}>
            <Loader illustId={illustId} />
          </React.Suspense>
        </span>
        <Action>
          <Circle>
            <GoPreviousButton />
          </Circle>
          <Circle>
            <GoNextButton />
          </Circle>
        </Action>
        <OverLay illustId={illustId} />
      </Box>
      {children}
    </Root>
  )
}

const Loader = ({ illustId }: Props) => {
  const pages = usePages(illustId)

  if (!pages) return <Failure illustId={illustId} />
  return <Success pages={pages} />
}

const Loading = () => {
  const { go } = useRouteActions()

  return (
    <ImageBox onClick={e => e.stopPropagation()}>
      <Progress onClick={e => go(e.shiftKey ? -1 : 1)} />
    </ImageBox>
  )
}

const Failure = ({ illustId }: Props) => {
  return (
    <ImageBox>
      <Dialog onClick={e => e.stopPropagation()}>
        <Dialog.Content>
          <Paragraph>リクエストに失敗しました[illustId: {illustId}]</Paragraph>
        </Dialog.Content>
        <Dialog.Footer>
          <Button onClick={() => usePages.remove(illustId)}>
            <RefreshIcon width={18} height={18} sx={{ mr: 2 }} />
            再取得
          </Button>
        </Dialog.Footer>
      </Dialog>
    </ImageBox>
  )
}

const Success = ({ pages }: SuccessProps) => {
  const imgs = useMemo(() => {
    const ugoira = isUgoira(pages[0])
    return pages.map((page, index) => (
      <ScrollSpy.SpyItem key={page.urls.original} index={index}>
        <ImageBox tabIndex={0}>
          {!ugoira && <StandardImg {...page} />}
          {ugoira && <StandardUgoira {...page} />}
        </ImageBox>
      </ScrollSpy.SpyItem>
    ))
  }, [pages])

  return (
    <>
      {imgs}
      <ScrollSpy.SpyItemLast />
    </>
  )
}

const Root = styled.section(
  extend({
    '--caption-height': '56px',
    pointerEvents: 'auto',
    outline: 'none',
    position: 'relative',
    overflow: 'auto',
    width: '100%',
    height: '100vh',
    '&[hidden]': {
      display: 'block',
      opacity: 0
    }
  })
)

const ImageBox = styled.div(
  extend({
    outline: 'none',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100vh - var(--caption-height))',
    p: PADDING
  })
)

const Action = styled.div(
  extend({
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-between',
    size: '100%'
  })
)

const Circle = styled.div(
  extend({
    pointerEvents: 'auto',
    position: 'sticky',
    top: 'calc(50vh - var(--caption-height))',
    width: '48px',
    height: '48px',
    mx: 2,
    borderRadius: '50%',
    bg: 'surface',
    opacity: themeGet('opacities.inactive'),
    transform: 'translateY(-50%)',
    ':hover': {
      opacity: 1
    }
  })
)

if (__DEV__) {
  Loader.displayName = 'StandardView.Loader'
  Loading.displayName = 'StandardView.Loading'
  Success.displayName = 'StandardView.Success'
  Failure.displayName = 'StandardView.Failure'
  Root.displayName = 'StandardView.Root'
  ImageBox.displayName = 'StandardView.ImageBox'
  Action.displayName = 'StandardView.Action'
  Circle.displayName = 'StandardView.Circle'
}
