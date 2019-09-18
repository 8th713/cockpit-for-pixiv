import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { usePages } from '../Pages'
import { OverLay, useScrollSpy } from '../ScrollSpy'
import { isUgoira } from '../Ugoira'
import { FullSizeImg } from './FullSizeImg'
import { FullSizeMode, useUpdateFullSizeMode } from './FullSizeMode'
import { FullSizeUgoira } from './FullSizeUgoira'

interface Props {
  illustId: string
}
interface LoaderProps extends Props {}
interface SuccessProps extends Props {
  pages: Pixiv.Pages
}

export const FullSizeView = ({ illustId }: Props) => (
  <FullSizeMode.On>
    <React.Suspense fallback={null}>
      <FullSizeViewLoader illustId={illustId} />
    </React.Suspense>
  </FullSizeMode.On>
)
const FullSizeViewLoader = ({ illustId }: LoaderProps) => {
  const pages = usePages(illustId)
  if (!pages) return null
  return <FullSizeViewSuccess illustId={illustId} pages={pages} />
}
const FullSizeViewSuccess = ({ illustId, pages }: SuccessProps) => {
  const [{ index }] = useScrollSpy()
  const page = pages[index]
  const isMultiple = pages.length > 1
  const updateFullSizeMode = useUpdateFullSizeMode()
  const ref = useRef<HTMLDivElement>(null)
  const ugoira = isUgoira(page)

  // ページを移動したら先頭までスクロールしてフォーカス
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
            {ugoira && <FullSizeUgoira illustId={illustId} {...page} />}
          </Preview>
        </ClickableBox>
        {isMultiple && <OverLay.Success pages={pages} />}
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
