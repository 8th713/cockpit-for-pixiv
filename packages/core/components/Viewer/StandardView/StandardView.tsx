import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Pages } from '../../../interfaces'
import { useRouteActions } from '../../Router'
import { useFullSizeMode } from '../FullSizeMode'
import { ScrollSpy } from '../ScrollSpy'
import { isUgoira } from '../utils'
import { Img } from './Img'
import { Ugoira } from './Ugoira'

type Props = {
  id: string
  pages: Pages
  children?: React.ReactNode
}

export function StandardView({ id, pages, children }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const { unset } = useRouteActions()
  const [isFullSize, setFullSize] = useFullSizeMode()
  const isMultiple = pages.length > 1
  const imgs = useMemo(() => {
    const ugoira = isUgoira(pages[0])
    return pages.map((page, index) => (
      <ScrollSpy.SpyItem key={page.urls.original} index={index}>
        <Box tabIndex={0}>
          {!ugoira && <Img {...page} root={root} />}
          {ugoira && <Ugoira id={id} {...page} />}
        </Box>
      </ScrollSpy.SpyItem>
    ))
  }, [id, pages])

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
      <Container>
        <span onClick={unset}>
          {imgs}
          <ScrollSpy.SpyItemLast />
        </span>
        {isMultiple && <ScrollSpy.OverLay pages={pages} />}
      </Container>
      {children}
    </Root>
  )
}

const Root = styled.section`
  position: relative;
  overflow: auto;
  display: block;
  width: 100%;
  height: 100%;
  &[hidden] {
    opacity: 0;
  }
`
const Container = styled.div`
  position: relative;
`
const Box = styled.div`
  box-sizing: border-box;
  outline: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - var(--caption-height));
  padding: 32px;
`

StandardView.Mock = Root
StandardView.Box = Box
