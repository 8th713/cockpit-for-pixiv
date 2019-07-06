import React from 'react'
import styled from 'styled-components'
import { Text } from '../shared/Text'

type Props = {
  label: React.ReactNode
  children?: React.ReactNode
}

export function Section(props: Props) {
  return (
    <Layout>
      <Header>
        <Text kind="h2">{props.label}</Text>
      </Header>
      {props.children}
    </Layout>
  )
}

const Layout = styled.section`
  all: unset;
  display: block;
  min-width: 512px;
  & + & {
    padding-top: 16px;
  }
`
const Header = styled.header`
  all: unset;
  display: block;
  padding: 16px 0;
`
