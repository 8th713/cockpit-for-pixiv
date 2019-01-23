import React from 'react'
import styled from 'styled-components'
import { Page } from '../../../interfaces'
import { PaddingProvider } from '../../../contexts'
import { Img } from './Img'

type Props = {
  id: string
  page: Page
  children?: never
}

export function Ugoira(props: Props) {
  const padding = PaddingProvider.useValue()

  return (
    <Layout style={{ padding }}>
      <Img key={props.page.urls.original} {...props} />
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
