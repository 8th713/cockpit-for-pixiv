import React from 'react'
import styled from 'styled-components'
import { useIllust } from '../IllustHost'
import { FollowButton } from './FollowButton'
import { NameCard } from './NameCard'
import { UserHost } from './UserHost'

export function User() {
  const { read } = useIllust()
  const illust = read()

  if (!illust) return null

  return (
    <UserHost id={illust.userId}>
      <Root>
        <NameCard />
        <FollowButton />
      </Root>
    </UserHost>
  )
}

const Root = styled.div`
  all: unset;
  position: sticky;
  top: var(--caption-height);
  flex: 0 0 280px;
`
