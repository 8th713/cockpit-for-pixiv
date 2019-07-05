import React from 'react'
import styled from 'styled-components'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'

const prefix = '/member_illust.php?mode=medium&illust_id='

export function Title() {
  const { apiClient } = useServices()
  const id = useRoute()[0]!
  const illust = apiClient.useIllust(id)

  if (!illust) return null

  const { title } = illust
  return (
    <Link href={prefix + id} title={title}>
      {title}
    </Link>
  )
}

const Link = styled.a`
  color: var(--on-surface);
  font-size: 1.25em;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  white-space: nowrap;
  :hover {
    text-decoration: none;
  }
  :focus {
    outline: auto var(--primary);
  }
`
