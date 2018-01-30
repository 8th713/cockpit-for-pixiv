import * as React from 'react'
import styled from 'styled-components'
import { SubTitle } from './SubTitle'
import { Info, Bug } from '../shared/Icon'
import { HelpStore } from '../../store'
import { light } from '../shared/variables'

interface Props {
  store: HelpStore
}

export const About: React.SFC<Props> = ({ store }) => (
  <section>
    <SubTitle>About</SubTitle>
    <ListItem href={store.productURL}>
      <Info />
      <Text>View the Github Project</Text>
    </ListItem>
    <ListItem href={store.supportURL}>
      <Bug />
      <Text>Report Issues</Text>
    </ListItem>
  </section>
)

const ListItem = styled.a`
  box-sizing: border-box;
  position: relative;
  display: grid;
  grid-template-columns: 56px 1fr;
  align-items: center;
  min-height: 48px;
  margin: 0;
  padding: 12px 16px;
  color: ${light.action.active};
  transition: background-color 255ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    background-color: ${light.action.hover};
    text-decoration: none;
  }
`

const Text = styled.div`
  overflow: auto;
  overflow-wrap: break-word;
  align-self: center;
  color: ${light.text.primary};
`
