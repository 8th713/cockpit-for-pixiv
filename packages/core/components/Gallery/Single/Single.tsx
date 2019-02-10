import React, { useContext } from 'react'
import styled from 'styled-components'
import { Page } from '../../../interfaces'
import { PaddingProvider } from '../../../contexts'
import { Img } from './Img'

type Props = {
  page: Page
  children?: never
}

export function Single({ page }: Props) {
  const padding = useContext(PaddingProvider.ValueContext)

  return (
    <Layout style={{ padding }}>
      <Img key={page.urls.original} page={page} />
    </Layout>
  )
}

const Layout = styled.div`
  box-sizing: border-box;
  display: grid;
  width: fit-content;
  min-width: 100%;
  min-height: 100%;
  align-content: center;
  justify-items: center;
  align-items: start;
`
