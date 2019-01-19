import React from 'react'
import styled from 'styled-components'
import { color } from '../theme'
import { UserProvider } from '../../contexts'
import { Row } from './Row'
import { FollowButton } from './FollowButton'

type Props = {
  userId: string
  children?: never
}

export function Author({ userId }: Props) {
  return (
    <UserProvider userId={userId}>
      <Layout>
        <Row />
        <FollowButton />
      </Layout>
    </UserProvider>
  )
}

const Layout = styled.div`
  all: unset;
  position: sticky;
  top: 0;
  display: grid;
  grid-template-rows: 56px 56px;
  align-items: center;
  background-color: ${color.surface};
  color: ${color.surfaceText};
`
