import React from 'react'
import styled from 'styled-components'
import { PickerProvider, PagesProvider, BoardProvider } from '../../contexts'
import { Divide } from './Divide'

export const Gallery = React.memo(function Gallery() {
  const { unsetElement } = PickerProvider.useAction()
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <PagesProvider>
      <BoardProvider observe={ref}>
        <Layout tabIndex={0} ref={ref} onClick={unsetElement}>
          <Divide />
        </Layout>
      </BoardProvider>
    </PagesProvider>
  )
})

const Layout = styled.div`
  user-select: none;
  position: relative;
  overflow: auto;
  width: 100%;
  flex: 100%;
`
