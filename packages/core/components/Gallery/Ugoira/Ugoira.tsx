import React from 'react'
import styled from 'styled-components'
import { usePaddingContext } from '../../../hooks'
import { Page } from '../../../interfaces'
import { Img } from './Img'

type Props = {
  id: string
  page: Page
  children?: never
}

export function Ugoira(props: Props) {
  const [padding] = usePaddingContext()

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
