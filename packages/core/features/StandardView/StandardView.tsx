import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  Dialog,
  Progress,
  RefreshIcon,
  Text
} from '../../components'
import { useFullSizeMode } from '../FullSizeView'
import { useIObserver } from '../IntersectionObserver'
import { usePages } from '../Pages'
import { GoNextButton, GoPreviousButton, useRouteActions } from '../Router'
import { OverLay, SpyItem, SpyItemLast } from '../ScrollSpy'
import { isUgoira } from '../Ugoira'
import { PADDING, StandardImg } from './StandardImg'
import { StandardUgoira } from './StandardUgoira'

interface Props {
  illustId: string
}
interface SuspenseProps extends Props {
  children?: React.ReactNode
}
interface LoaderProps extends Props {}
interface FailureProps extends Props {}
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
      <Box position="relative">
        <span onClick={unset}>
          <React.Suspense fallback={<StandardViewLoading />}>
            <StandardViewLoader illustId={illustId} />
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
const StandardViewLoader = ({ illustId }: LoaderProps) => {
  const pages = usePages(illustId)

  if (!pages) return <StandardViewFailure illustId={illustId} />
  return <StandardViewSuccess pages={pages} />
}
const StandardViewLoading = () => {
  const { go } = useRouteActions()

  return (
    <ImageBox onClick={e => e.stopPropagation()}>
      <Progress onClick={e => go(e.shiftKey ? -1 : 1)} />
    </ImageBox>
  )
}
const StandardViewFailure = ({ illustId }: FailureProps) => {
  return (
    <ImageBox>
      <Dialog onClick={e => e.stopPropagation()} backdrop={false}>
        <Dialog.Content>
          <Text>リクエストに失敗しました[illustId: {illustId}]</Text>
        </Dialog.Content>
        <Dialog.Action>
          <Button
            variant="contained"
            colors="error"
            onClick={() => usePages.remove(illustId)}
          >
            <RefreshIcon size={18} mr={2} />
            再取得
          </Button>
        </Dialog.Action>
      </Dialog>
    </ImageBox>
  )
}
const StandardViewSuccess = ({ pages }: SuccessProps) => {
  const imgs = useMemo(() => {
    const ugoira = isUgoira(pages[0])
    return pages.map((page, index) => (
      <SpyItem key={page.urls.original} index={index}>
        <ImageBox tabIndex={0}>
          {!ugoira && <StandardImg {...page} />}
          {ugoira && <StandardUgoira {...page} />}
        </ImageBox>
      </SpyItem>
    ))
  }, [pages])

  return (
    <>
      {imgs}
      <SpyItemLast />
    </>
  )
}

const Root = styled.section`
  outline: none;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: auto;
  &[hidden] {
    opacity: 0;
  }
`
const ImageBox = styled.div`
  box-sizing: border-box;
  outline: none;
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100vh - var(--caption-height));
  padding: ${PADDING}px;
  flex-direction: column;
`
const Action = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`
const Circle = styled(Box)`
  pointer-events: auto;
  position: sticky;
  top: calc(50vh - var(--caption-height));
  width: 48px;
  height: 48px;
  margin: 0 8px;
  border-radius: 50%;
  background-color: var(--surface);
  opacity: var(--medium);
  transform: translateY(-50%);
  :hover {
    opacity: 1;
  }
`
