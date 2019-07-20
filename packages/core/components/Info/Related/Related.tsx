import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FormatedProfile } from '../../../interfaces'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Box, Button, Refresh, Text } from '../../shared'
import { Img } from './Img'

interface Props {
  illustId: string
  userId: string
}
interface LoaderProps extends Props {}
interface FailureProps extends Props {}
interface SuccessProps extends Props, FormatedProfile {}

const THUMBNAIL_SIZE = 168

export function Related() {
  const id = useRoute()[0]!
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
  const profire = useProfire(props.userId)

  if (!profire) return <RelatedFailure {...props} />
  return <RelatedSuccess {...props} {...profire} />
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
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const current = document.getElementById(`cfp-related-${illustId}`)
    if (current) {
      const offset = node.offsetWidth / 2 - THUMBNAIL_SIZE / 2
      node.scrollLeft = current.offsetLeft - offset
    } else {
      node.scrollLeft = 0
    }
  }, [illustId])

  return (
    <Box ref={ref} overflow="auto">
      <Container>
        {illusts.map(illust => (
          <ThumbnailButton
            key={illust.id}
            aria-current={illustId === illust.id}
            tabIndex={illustId === illust.id ? -1 : void 0}
            id={`cfp-related-${illust.id}`}
            href={`/member_illust.php?mode=medium&illust_id=${illust.id}`}
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
      </Container>
    </Box>
  )
}

const Container = styled.div`
  display: flex;
  width: fit-content;
  padding: 0 16px 4px;
`
const ThumbnailButton = styled.a`
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
  &[aria-current='true'] {
    pointer-events: none;
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
