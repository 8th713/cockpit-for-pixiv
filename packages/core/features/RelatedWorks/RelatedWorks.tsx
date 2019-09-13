import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Box, Button, Hotkey, RefreshIcon, Text } from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { fetchRelatedIllusts } from '../../externals/apiClient'
import { createCache } from '../../hooks/useCache'
import { useIllust } from '../Illust'
import { useRouteActions, useRouteId } from '../Router'
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
  return <RelatedWorksLoader illustId={illustId} userId={illust.userId} />
}
const RelatedWorksLoader = (props: LoaderProps) => {
  const relatedIllusts = useRelatedIllusts(props.userId)

  if (!relatedIllusts) return <RelatedWorksFailure {...props} />
  return (
    <RelatedWorksSuccess
      key={props.userId}
      {...props}
      illusts={relatedIllusts}
    />
  )
}
const RelatedWorksFailure = ({ userId }: FailureProps) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Button
      m="auto"
      variant="contained"
      colors="error"
      onClick={() => useRelatedIllusts.remove(userId)}
    >
      <RefreshIcon size={18} mr={2} />
      再取得
    </Button>
  </Box>
)
const RelatedWorksSuccess = ({ illustId, illusts }: SuccessProps) => {
  const root = useRef<HTMLDivElement>(null)
  const selected = useRef<HTMLButtonElement>(null)
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
    <Box ref={root} overflow="scroll auto">
      <Container>
        {illusts.map(illust => (
          <ThumbnailButton
            key={illust.id}
            disabled={illustId === illust.id}
            ref={illustId === illust.id ? selected : null}
            onClick={() => push(illust.id)}
          >
            <Img alt={illust.title} src={illust.url} size={THUMBNAIL_SIZE} />
            <Chip textStyle="caption">{getChipText(illust)}</Chip>
          </ThumbnailButton>
        ))}
      </Container>
      <Hotkey {...KEY_ASSIGNMENT.goPrevRelatedIllust} action={prev} />
      <Hotkey {...KEY_ASSIGNMENT.goNextRelatedIllust} action={next} />
    </Box>
  )
}
const getChipText = ({ pageCount, illustType }: Pixiv.SimpleIllust) =>
  pageCount !== 1 ? pageCount : illustType === 2 ? 'U' : null

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
