import React from 'react'
import styled from 'styled-components'
import { PaddingProvider } from '../../../contexts'
import { Page } from '../../../interfaces'
import { Img } from './Img'

type Props = {
  page: Page
  children?: never
}

export function Single({ page }: Props) {
  const [padding] = PaddingProvider.use()

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
