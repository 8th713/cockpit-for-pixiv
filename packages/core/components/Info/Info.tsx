import React from 'react'
import styled from 'styled-components'
import { color } from '../theme'
import { ExpansionProvider, IllustProvider } from '../../contexts'
import { Divider } from '../shared/Divider'
import { Summary } from './Summary'
import { Desctiption } from './Desctiption'
import { UserCard } from './UserCard'

export function Info() {
  const opened = ExpansionProvider.useValue()

  return (
    <IllustProvider>
      <Layout>
        <Summary />
        {opened && (
          <>
            <Divider m={16} />
            <Details>
              <Desctiption />
              <UserCard />
            </Details>
          </>
        )}
      </Layout>
    </IllustProvider>
  )
}

const Layout = styled.div`
  all: unset;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  max-height: 30%;
  background-color: ${color.surface};
`
const Details = styled.div`
  all: unset;
  flex: 0 1 auto;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 24px;
  align-items: start;
  padding: 24px;
`
