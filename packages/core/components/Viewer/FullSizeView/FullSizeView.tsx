import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Pages } from '../../../interfaces'
import { useUpdateFullSizeMode } from '../FullSizeMode'
import { ScrollSpy, useScrollSpy } from '../ScrollSpy'
import { isUgoira } from '../utils'
import { FullSizeImg } from './FullSizeImg'
import { FullSizeUgoira } from './FullSizeUgoira'

type Props = {
  id: string
  pages: Pages
}

export function FullSizeView({ id, pages }: Props) {
  const [{ index }] = useScrollSpy()
  const page = pages[index]
  const isMultiple = pages.length > 1
  const updateFullSizeMode = useUpdateFullSizeMode()
  const ref = useRef<HTMLDivElement>(null)
  const ugoira = isUgoira(page)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.scroll(0, 0)
    node.focus()
  }, [page])

  return (
    <Root ref={ref} tabIndex={0}>
      <AdjustBox>
        <ClickableBox onClick={() => updateFullSizeMode(false)}>
          <Preview>
            {!ugoira && <FullSizeImg key={page.urls.original} {...page} />}
            {ugoira && (
              <FullSizeUgoira key={page.urls.original} id={id} {...page} />
            )}
          </Preview>
        </ClickableBox>
        {isMultiple && <ScrollSpy.OverLay pages={pages} />}
      </AdjustBox>
    </Root>
  )
}

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  --caption-height: 0px;
`
const AdjustBox = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  height: fit-content;
  min-width: 100%;
  min-height: 100%;
  margin: auto;
  flex-direction: column;
`
const ClickableBox = styled.div`
  cursor: zoom-out;
  display: flex;
  min-width: 100%;
  min-height: 100%;
  flex: 1 0;
  margin: auto;
  flex-direction: column;
`
const Preview = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: auto;
  padding: 32px;
`
