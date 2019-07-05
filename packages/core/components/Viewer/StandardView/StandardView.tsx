import React, { useEffect, useMemo, useRef } from 'react'
import { Pages } from '../../../interfaces'
import { useRouteActions } from '../../Router'
import { useFullSizeMode } from '../FullSizeMode'
import { ScrollSpy } from '../ScrollSpy'
import { isUgoira } from '../utils'
import { Img } from './Img'
import { StandardViewMock } from './StandardViewMock'
import { Ugoira } from './Ugoira'

type Props = {
  pages: Pages
  children?: React.ReactNode
}

export function StandardView({ pages, children }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const { unset } = useRouteActions()
  const [isFullSize, setFullSize] = useFullSizeMode()
  const isMultiple = pages.length > 1
  const imgs = useMemo(() => {
    const ugoira = isUgoira(pages[0])
    return pages.map((page, index) => (
      <ScrollSpy.SpyItem key={page.urls.original} index={index}>
        <StandardViewMock.Box tabIndex={0}>
          {!ugoira && <Img {...page} root={root} />}
          {ugoira && <Ugoira {...page} />}
        </StandardViewMock.Box>
      </ScrollSpy.SpyItem>
    ))
  }, [pages])

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
    <StandardViewMock.Root ref={root} tabIndex={0} hidden={isFullSize}>
      <StandardViewMock.Container>
        <span onClick={unset}>
          {imgs}
          <ScrollSpy.SpyItemLast />
        </span>
        {isMultiple && <ScrollSpy.OverLay pages={pages} />}
      </StandardViewMock.Container>
      {children}
    </StandardViewMock.Root>
  )
}
