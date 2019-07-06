import React from 'react'
import styled from 'styled-components'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import * as styles from '../../shared/styles'

const prefix = '/member_illust.php?mode=medium&illust_id='

export function Title() {
  const { useIllust } = useServices()
  const id = useRoute()[0]!
  const illust = useIllust(id)

  if (!illust) return null

  const { title } = illust
  return (
    <Link href={prefix + id} title={title}>
      {title}
    </Link>
  )
}

const Link = styled.a`
  ${styles.link};
  color: var(--on-surface);
`
