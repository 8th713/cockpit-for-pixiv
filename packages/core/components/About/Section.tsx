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
      <header>
        <Text textStyle="h2" pb={1}>
          {props.label}
        </Text>
      </header>
      {props.children}
    </Layout>
  )
}

const Layout = styled.section`
  display: block;
  min-width: 512px;
  & + & {
    margin-top: 16px;
  }
`
