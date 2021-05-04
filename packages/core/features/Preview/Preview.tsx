import { useEffect, useRef } from 'react'
import { KEY_ASSIGNMENT } from '../../keyboardMap'
import { Box } from '../../shared/Box'
import { Hotkey } from '../../shared/Hotkey'
import { FullSize } from './FullSize/FullSize'
import { ImageList } from './ImageList/ImageList'
import { useIsFullSize, useSetIsFullSize } from './previewState'

export interface PreviewProps {
  id: string
  children?: React.ReactNode
}

export const Preview = ({ id, children }: PreviewProps) => {
  const isFullSize = useIsFullSize()
  const { toggle } = useSetIsFullSize()
  const scrollableElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollableElement = scrollableElementRef.current

    if (!scrollableElement) return
    scrollableElement.scroll(0, 0)
    scrollableElement.focus()
  }, [id])

  return (
    <>
      <Box
        ref={scrollableElementRef}
        id="cfp-scrollable"
        tabIndex={-1}
        css={{ cover: 0, overflow: 'auto' }}
        style={{ opacity: isFullSize ? 0 : 1 }}
      >
        <ImageList id={id} />
        {children}
      </Box>
      {isFullSize && <FullSize id={id} />}
      <Hotkey {...KEY_ASSIGNMENT.fullSizeMode} onKeydown={toggle} />
    </>
  )
}
