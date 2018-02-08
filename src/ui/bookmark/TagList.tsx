import * as React from 'react'
import styled from 'styled-components'
import { light } from '../shared/variables'

interface Props {
  title: string
  helper?: React.ReactNode
}

export const TagList: React.SFC<Props> = ({ title, helper, children }) => (
  <Root>
    <Header>
      <div>{title}</div>
      {helper}
    </Header>
    <Wrapper>{children}</Wrapper>
  </Root>
)

const Root = styled.div`
  display: grid;
  grid-gap: 8px;
`

const Header = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 16px;
`

const Wrapper = styled.div`
  box-sizing: border-box;
  overflow: auto;
  max-height: 256px;
  padding: 8px;
  border-radius: 2px;
  background-color: ${light.background.appBar};
`
