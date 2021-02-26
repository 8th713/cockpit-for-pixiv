import { useLayoutEffect, useRef } from 'react'
import { KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Box, Flex, Skeleton } from '../../../shared/Box'
import { Hotkey } from '../../../shared/Hotkey'
import { Img } from '../../../shared/Img'
import { duration, easing, styled } from '../../../stitches.config'
import { useNavigate } from '../../Router/routerState'
import { useRecentIllustsQuery } from './recentIllustsQuery'

export type RecentIllustListProps = {
  id: string
}

export const RecentIllustList = ({ id }: RecentIllustListProps) => {
  const root = useRef<HTMLDivElement>(null)
  const selected = useRef<HTMLButtonElement>(null)
  const { data } = useRecentIllustsQuery(id)
  const nav = useNavigate()
  const go = (n: number) => {
    if (!data) return

    const max = data.length
    const currentIndex = data.findIndex((artwork) => artwork.id === id)

    n = currentIndex === -1 ? 0 : n

    const targetIndex = (max + currentIndex + n) % max
    const artwork = data[targetIndex]

    nav.push(artwork.id)
  }
  const prev = () => go(-1)
  const next = () => go(1)

  useLayoutEffect(() => {
    const rootNode = root.current
    const selectedNode = selected.current

    if (!rootNode) return
    if (selectedNode) {
      const offset = rootNode.offsetWidth / 2 - 168 / 2

      rootNode.scrollLeft = selectedNode.offsetLeft - offset
    } else {
      rootNode.scrollLeft = 0
    }
  }, [data, id])

  return (
    <Box
      ref={root}
      css={{
        overflowX: 'scroll',
        backgroundColor: '$surface',
        color: '$onSurface',
      }}
    >
      <Flex
        css={{
          boxSizing: 'content-box',
          width: 'fit-content',
          height: 168,
          padding: '$3',
          columnGap: '$2',
        }}
      >
        {data ? (
          data.slice(0, 15).map((artwork) => (
            <Button
              key={artwork.id}
              disabled={id === artwork.id}
              ref={id === artwork.id ? selected : null}
              onClick={() => nav.push(artwork.id)}
            >
              <Img
                css={{ display: 'block', objectFit: 'contain' }}
                width="168"
                height="168"
                loading="lazy"
                src={artwork.url}
                alt={artwork.title}
                title={artwork.title}
              />
              <Chip>{getChipText(artwork)}</Chip>
            </Button>
          ))
        ) : (
          <>
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
            <Skeleton css={{ size: 168, flexShrink: 0 }} />
          </>
        )}
      </Flex>
      <Hotkey
        {...KEY_ASSIGNMENT.goPrevRelatedIllust}
        disabled={!data}
        onKeydown={prev}
      />
      <Hotkey
        {...KEY_ASSIGNMENT.goNextRelatedIllust}
        disabled={!data}
        onKeydown={next}
      />
    </Box>
  )
}

const Button = styled('button', {
  appearance: 'none',
  cursor: 'zoom-in',
  outlineWidth: 0,
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  display: 'block',
  width: 168,
  height: 168,
  flexShrink: 0,
  margin: 0,
  padding: 0,
  borderWidth: 0,
  opacity: 1,
  '&:disabled': {
    cursor: 'default',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    pointerEvents: 'none',
    boxSizing: 'inherit',
    cover: 0,
    borderRadius: 'inherit',
    backgroundColor: '#fff',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: duration.simple,
    transitionTimingFunction: easing.standard,
  },
  '&:hover::after': {
    opacity: 0.12,
  },
  '&:focus-visible::after': {
    opacity: 0.24,
  },
  '&:disabled::after': {
    opacity: 0.38,
  },
})

const Chip = styled('span', {
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  right: 0,
  minWidth: 0,
  margin: 0,
  paddingX: '$2',
  borderBottomLeftRadius: 4,
  backgroundColor: 'rgba(0,0,0,0.38)',
  color: '$onSurface',
  '&:empty': {
    display: 'none',
  },
})

const getChipText = ({ pageCount, illustType }: Pixiv.SimpleIllust) =>
  pageCount !== 1 ? pageCount : illustType === 2 ? 'U' : null

if (__DEV__) {
  Button.displayName = 'RecentIllustList.Item'
  Chip.displayName = 'RecentIllustList.Chip'
}
