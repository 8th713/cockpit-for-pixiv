import React, { useContext, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { useIntersection } from '../../../hooks/useIntersection'
import { useRouteActions } from '../../Router'
import { useServices } from '../../Services'
import { Box, Button, Dialog, Progress, Refresh, Text } from '../../shared'
import { useFullSizeMode } from '../FullSizeMode'
import { OverLay, SpyItem, SpyItemLast } from '../ScrollSpy'
import { isUgoira } from '../utils'
import { PADDING, StandardImg } from './StandardImg'
import { StandardUgoira } from './StandardUgoira'

interface Props {
  children?: React.ReactNode
}
interface SuspenseProps extends Props {
  id: string
}
interface LoaderProps extends Props {
  id: string
}
interface LoadingProps extends Props {}
interface FailureProps extends Props {
  id: string
}
interface SuccessProps extends Props {
  pages: Pixiv.Pages
}
type Observer = ReturnType<typeof useIntersection>

const LazyContext = React.createContext<Observer | null>(null)

export function useLazyObserver() {
  const value = useContext(LazyContext)
  if (value === null) {
    throw new Error('Missing LazyContext')
  }
  return value
}

export function StandardView({ id, children }: SuspenseProps) {
  return (
    <React.Suspense
      fallback={<StandardViewLoading>{children}</StandardViewLoading>}
    >
      <StandardViewLoader id={id}>{children}</StandardViewLoader>
    </React.Suspense>
  )
}
function StandardViewLoader({ id, children }: LoaderProps) {
  const { usePages } = useServices()
  const pages = usePages(id)

  if (!pages)
    return <StandardViewFailure id={id}>{children}</StandardViewFailure>
  return <StandardViewSuccess pages={pages}>{children}</StandardViewSuccess>
}
function StandardViewLoading({ children }: LoadingProps) {
  const { unset, go } = useRouteActions()
  const goFromEvent: React.MouseEventHandler = e => {
    e.stopPropagation()
    go(e.shiftKey ? -1 : 1)
  }

  return (
    <Root>
      <Box position="relative">
        <span onClick={unset}>
          <ImageBox>
            <Progress onClick={goFromEvent} />
          </ImageBox>
        </span>
      </Box>
      {children}
    </Root>
  )
}
function StandardViewFailure({ id, children }: FailureProps) {
  const { unset } = useRouteActions()
  const { usePages } = useServices()

  return (
    <Root>
      <Box position="relative">
        <span onClick={unset}>
          <ImageBox>
            <Dialog onClick={e => e.stopPropagation()} backdrop={false}>
              <Dialog.Content>
                <Text>リクエストに失敗しました[id: {id}]</Text>
              </Dialog.Content>
              <Dialog.Action>
                <Button
                  variant="contained"
                  colors="error"
                  onClick={() => usePages.remove(id)}
                >
                  <Refresh size={18} mr={2} />
                  再取得
                </Button>
              </Dialog.Action>
            </Dialog>
          </ImageBox>
        </span>
      </Box>
      {children}
    </Root>
  )
}
function StandardViewSuccess({ pages, children }: SuccessProps) {
  const root = useRef<HTMLDivElement>(null)
  const { unset } = useRouteActions()
  const [isFullSize, setFullSize] = useFullSizeMode()
  const isMultiple = pages.length > 1
  const observer = useIntersection()
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

  useEffect(
    () =>
      observer.start({
        root: root.current,
        rootMargin: '50%'
      }),
    [observer]
  )
  useEffect(() => {
    setFullSize(false)
    const node = root.current
    if (!node) return
    node.scroll(0, 0)
    node.focus()
  }, [pages, setFullSize])
  useEffect(() => {
    if (isFullSize) return
    const node = root.current
    if (!node) return
    node.focus()
  }, [isFullSize])

  return (
    <Root ref={root} tabIndex={0} hidden={isFullSize}>
      <Box position="relative">
        <span onClick={unset}>
          <LazyContext.Provider value={observer}>{imgs}</LazyContext.Provider>
          <SpyItemLast />
        </span>
        {isMultiple && <OverLay pages={pages} />}
      </Box>
      {children}
    </Root>
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
