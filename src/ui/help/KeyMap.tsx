import * as React from 'react'
import styled from 'styled-components'
import { SubTitle } from './SubTitle'
import { HelpStore } from '../../store'

interface Props {
  store: HelpStore
}

export const KeyMap: React.SFC<Props> = ({ store }) => (
  <section>
    <SubTitle>Keyboard Shortcut</SubTitle>
    <List>
      {store.keyList.map(binding => (
        <React.Fragment key={binding.key}>
          <Key>{binding.key}</Key>
          <p>{binding.description}</p>
        </React.Fragment>
      ))}
    </List>
  </section>
)

const List = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 40px 1fr;
  grid-gap: 8px;
  align-items: center;
  padding: 0 16px 16px;
`

const Key = styled.kbd`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  font-family: 'Source Code Pro', 'Consolas', monospace;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
`
