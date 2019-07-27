import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useIntersection } from '../../../hooks/useIntersection'
import { useRouteActions, useRouteId } from '../../Router'
import { useServices } from '../../Services'
import { Box, Button, Hotkey, Refresh, Text } from '../../shared'
import { Img } from './Img'

interface Props {
  illustId: string
  userId: string
}
interface LoaderProps extends Props {}
interface FailureProps extends Props {}
interface SuccessProps extends Props {
  illusts: Pixiv.RelatedIllusts
}
type Observer = ReturnType<typeof useIntersection>

const THUMBNAIL_SIZE = 168
const LazyContext = React.createContext<Observer | null>(null)

export function useLazyObserver() {
  const value = useContext(LazyContext)
  if (value === null) {
    throw new Error('Missing RelatedLazyContext')
  }
  return value
}

export function Related() {
  const id = useRouteId()
  const { useIllust } = useServices()
  const illust = useIllust(id)

  if (!illust) return null
  return (
    <React.Suspense fallback={null}>
      <RelatedLoader illustId={id} userId={illust.userId} />
    </React.Suspense>
  )
}
function RelatedLoader(props: LoaderProps) {
  const { useProfire } = useServices()
  const relatedIllusts = useProfire(props.userId)

  if (!relatedIllusts) return <RelatedFailure {...props} />
  return (
    <RelatedSuccess key={props.userId} {...props} illusts={relatedIllusts} />
  )
}
function RelatedFailure({ userId }: FailureProps) {
  const { useProfire } = useServices()

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button
        m="auto"
        variant="contained"
        colors="error"
        onClick={() => useProfire.remove(userId)}
      >
        <Refresh size={18} mr={2} />
        再取得
      </Button>
    </Box>
  )
}
function RelatedSuccess({ illustId, illusts }: SuccessProps) {
  const observer = useIntersection()
  const root = useRef<HTMLDivElement>(null)
  const latest = useRef<HTMLButtonElement>(null)
  const { push } = useRouteActions()
  const go = (n: number) => {
    const currentIndex = illusts.findIndex(illust => illust.id === illustId)
    n = currentIndex === -1 ? 0 : n
    const targetIndex = (illusts.length + currentIndex + n) % illusts.length
    const nextIllustId = illusts[targetIndex]
    push(nextIllustId.id)
  }
  const prev = () => go(-1)
  const next = () => go(1)

  useEffect(observer.start, [observer])
  useEffect(() => {
    const rootNode = root.current
    if (!rootNode) return
    const selected = latest.current
    if (selected) {
      const offset = rootNode.offsetWidth / 2 - THUMBNAIL_SIZE / 2
      rootNode.scrollLeft = selected.offsetLeft - offset
    } else {
      rootNode.scrollLeft = 0
    }
  }, [illustId])

  return (
    <Box ref={root} overflow="scroll auto">
      <Container>
        <LazyContext.Provider value={observer}>
          {illusts.map(illust => (
            <ThumbnailButton
              key={illust.id}
              disabled={illustId === illust.id}
              ref={illustId === illust.id ? latest : null}
              onClick={() => push(illust.id)}
            >
              <Img alt={illust.title} src={illust.url} size={THUMBNAIL_SIZE} />
              <Chip textStyle="caption">
                {illust.pageCount !== 1
                  ? illust.pageCount
                  : illust.illustType === 2
                  ? 'U'
                  : null}
              </Chip>
            </ThumbnailButton>
          ))}
        </LazyContext.Provider>
      </Container>
      <Hotkey {...KEY_ASSIGNMENT.goPrevRelatedIllust} action={prev} />
      <Hotkey {...KEY_ASSIGNMENT.goNextRelatedIllust} action={next} />
    </Box>
  )
}

const Container = styled.div`
  display: flex;
  width: fit-content;
  height: ${THUMBNAIL_SIZE}px;
  padding: 0 16px 4px;
`
const ThumbnailButton = styled.button`
  cursor: zoom-in;
  position: relative;
  display: flex;
  width: ${THUMBNAIL_SIZE}px;
  height: ${THUMBNAIL_SIZE}px;
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: var(--on-surface);
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--on-surface);
    opacity: 0;
  }
  &:hover::before {
    opacity: calc(var(--hovered) * 2);
  }
  &:focus::before {
    opacity: calc(var(--focused) * 2);
  }
  &:active::before {
    opacity: calc(var(--pressed) * 2);
  }
  :disabled {
    pointer-events: none;
    opacity: 1;
    ::before {
      opacity: var(--medium);
    }
  }
  & + & {
    margin-left: 8px;
  }
`
const Chip = styled(Text)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 8px;
  border-bottom-left-radius: 4px;
  background-color: rgba(0, 0, 0, var(--medium));
  color: var(--on-surface);
`
