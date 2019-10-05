import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { extend, Flex } from '../../components'
import { usePages } from '../Pages'
import { OverLay, useScrollSpy } from '../ScrollSpy'
import { isUgoira } from '../Ugoira'
import { FullSizeImg } from './FullSizeImg'
import { FullSizeMode, useUpdateFullSizeMode } from './FullSizeMode'
import { FullSizeUgoira } from './FullSizeUgoira'

interface Props {
  illustId: string
}

interface SuccessProps extends Props {
  pages: Pixiv.Pages
}

export const FullSizeView = ({ illustId }: Props) => (
  <FullSizeMode.On>
    <React.Suspense fallback={null}>
      <Loader illustId={illustId} />
    </React.Suspense>
  </FullSizeMode.On>
)

const Loader = ({ illustId }: Props) => {
  const pages = usePages(illustId)
  if (!pages) return null
  return <Success illustId={illustId} pages={pages} />
}

const Success = ({ illustId, pages }: SuccessProps) => {
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
          <Flex
            sx={{
              m: 'auto',
              p: 4
            }}
          >
            {!ugoira && <FullSizeImg key={page.urls.original} {...page} />}
            {ugoira && <FullSizeUgoira illustId={illustId} {...page} />}
          </Flex>
        </ClickableBox>
        {isMultiple && <OverLay pages={pages} />}
      </AdjustBox>
    </Root>
  )
}

const Root = styled.div(
  extend({
    '--caption-height': '0px',
    pointerEvents: 'auto',
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'auto',
    width: '100vw',
    height: '100vh'
  })
)

const AdjustBox = styled.div(
  extend({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    height: 'fit-content',
    minWidth: '100%',
    minHeight: '100%',
    m: 'auto'
  })
)

const ClickableBox = styled.div(
  extend({
    cursor: 'zoom-in',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    minWidth: '100%',
    minHeight: '100%',
    m: 'auto'
  })
)

if (__DEV__) {
  Loader.displayName = 'FullSizeView.Loader'
  Success.displayName = 'FullSizeView.Success'
  Root.displayName = 'FullSizeView.Root'
  AdjustBox.displayName = 'FullSizeView.AdjustBox'
  ClickableBox.displayName = 'FullSizeView.ClickableBox'
}
