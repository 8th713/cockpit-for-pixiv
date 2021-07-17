import { useLayoutEffect } from 'react'
import { Box, Flex } from '../../../shared/Box'
import { Button } from '../../../shared/Button'
import { Dialog, DialogContent, DialogFooter } from '../../../shared/Dialog'
import {
  PauseIcon,
  PlayIcon,
  RefreshIcon,
  StopIcon,
} from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import { Img } from '../../../shared/Img'
import { Paragraph, Word } from '../../../shared/Text'
import { styled } from '../../../stitches.config'
import { useUgoiraQuery } from '../pagesQuery'
import { useIsFullSize } from '../previewState'
import { usePlayer } from '../usePlayer'

export interface FullSizeUgoiraProps extends Pixiv.Page {
  id: string
}

export function FullSizeUgoira({ id, urls, ...size }: FullSizeUgoiraProps) {
  const { data, isLoading, isError, isFetching, refetch } = useUgoiraQuery(id)
  const { canvasRef, state, actions } = usePlayer(data || [])
  const { index, paused } = state
  const isFullSize = useIsFullSize()

  useLayoutEffect(() => {
    if (isFullSize) {
      actions.play()
    } else {
      actions.rewind()
    }
  }, [isFullSize, actions])

  if (isLoading)
    return (
      <Img
        src={urls.original}
        {...size}
        css={{
          display: 'block',
          margin: 'auto',
        }}
      />
    )
  if (isError || !data)
    return (
      <Dialog>
        <DialogContent>
          <Paragraph>リクエストに失敗しました</Paragraph>
          <Paragraph>illustId: {id}</Paragraph>
        </DialogContent>
        <DialogFooter>
          <Button
            disabled={isFetching}
            onClick={(e) => {
              e.stopPropagation()
              refetch()
            }}
          >
            <RefreshIcon />
            再取得
          </Button>
        </DialogFooter>
      </Dialog>
    )

  return (
    <Box
      css={{
        position: 'relative',
        margin: 'auto',
      }}
      style={size}
    >
      <Canvas ref={canvasRef} key={urls.original} {...size} />
      <Flex
        css={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          width: '100%',
          height: '$mdH',
          paddingX: '$2',
          paddingY: '$1',
          backgroundColor: 'rgba(0, 0, 0, .6)',
          color: '$onSurface',
          opacity: 0,
          '&:hover,&:focus-within': {
            opacity: 1,
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton onClick={actions.toggle}>
          {paused ? <PlayIcon /> : <PauseIcon />}
        </IconButton>
        <IconButton onClick={actions.rewind}>
          <StopIcon />
        </IconButton>
        <Box css={{ flexGrow: 1 }} />
        <Word css={{ paddingX: '$3' }}>
          {index + 1}/{data.length}
        </Word>
      </Flex>
    </Box>
  )
}

const Canvas = styled('canvas', {
  boxSizing: 'border-box',
  display: 'block',
  margin: 0,
})
