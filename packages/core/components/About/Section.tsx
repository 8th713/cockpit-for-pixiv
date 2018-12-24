import React from 'react'
import styled from 'styled-components'
import { Text } from '../shared/Text'

type Props = {
  label: React.ReactNode
  children?: React.ReactNode
}

export const Section: React.FC<Props> = props => (
  <Layout>
    <Header>
      <Text as="h2" v="s1">
        {props.label}
      </Text>
    </Header>
    {props.children}
  </Layout>
)

const Layout = styled.section`
  all: unset;
  display: block;
  min-width: 512px;
  padding-bottom: 16px;
  &:last-child {
    padding-bottom: 0;
  }
`
const Header = styled.header`
  all: unset;
  display: block;
  padding: 16px 0;
`
