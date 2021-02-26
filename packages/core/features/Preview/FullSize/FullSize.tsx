import { useLayoutEffect, useRef } from 'react'
import { Box, Flex } from '../../../shared/Box'
import { usePagesQuery } from '../pagesQuery'
import { PreviewControl } from '../PreviewControl/PreviewControl'
import { useItems, useSelected } from '../previewState'
import { FullSizeItem } from './FullSizeItem'

export interface FullSizeProps {
  id: string
}

export const FullSize = ({ id }: FullSizeProps) => {
  const scrollableElementRef = useRef<HTMLDivElement>(null)
  const { data } = usePagesQuery(id)
  const items = useItems()
  const [selected] = useSelected()
  const idx = items.findIndex((ref) => ref === selected)

  useLayoutEffect(() => {
    const scrollableElement = scrollableElementRef.current

    if (!scrollableElement) return
    scrollableElement.scroll(0, 0)
    scrollableElement.focus()
  }, [idx])

  if (!data || !data[idx]) return null

  const page = data[idx]

  return (
    <Box
      ref={scrollableElementRef}
      tabIndex={-1}
      css={{
        cover: 0,
        position: 'fixed',
        zIndex: 1,
        overflow: 'auto',
      }}
    >
      <Flex
        css={{
          position: 'relative',
          size: 'fit-content',
          minWidth: '100%',
          minHeight: '100%',
        }}
      >
        <FullSizeItem key={page.urls.original} {...page} id={id} />
        <PreviewControl />
      </Flex>
    </Box>
  )
}
