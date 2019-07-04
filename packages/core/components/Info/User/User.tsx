import React from 'react'
import styled from 'styled-components'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { FollowButton } from './FollowButton'
import { NameCard } from './NameCard'

export function User() {
  const { apiClient } = useServices()
  const { read } = apiClient.useIllust()
  const id = useRoute()[0]!
  const illust = read(id)

  if (!illust) return null

  return (
    <Root>
      <NameCard id={illust.userId} />
      <FollowButton id={illust.userId} />
    </Root>
  )
}

const Root = styled.div`
  all: unset;
  position: sticky;
  top: var(--caption-height);
  flex: 0 0 280px;
`
