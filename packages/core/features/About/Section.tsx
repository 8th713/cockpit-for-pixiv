import React from 'react'
import styled from 'styled-components'
import { Text } from '../../components'

type Props = {
  label: React.ReactNode
  children?: React.ReactNode
}

export const Section = (props: Props) => (
  <Layout>
    <header>
      <Text textStyle="h2" pb={1}>
        {props.label}
      </Text>
    </header>
    {props.children}
  </Layout>
)

const Layout = styled.section`
  display: block;
  min-width: 384px;
  & + & {
    margin-top: 16px;
  }
`
