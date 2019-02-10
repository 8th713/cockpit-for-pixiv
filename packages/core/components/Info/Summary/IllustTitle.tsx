import React, { useContext } from 'react'
import styled from 'styled-components'
import { IllustProvider } from '../../../contexts'
import { Text } from '../../shared/Text'

export function IllustTitle() {
  const { read } = useContext(IllustProvider.Context)
  const illust = read()

  if (!illust) {
    return (
      <Text as="h1" v="h6" c="error" noWrap>
        取得できませんでした
      </Text>
    )
  }

  return (
    <Text as="h1" v="h6" noWrap>
      <Link
        href={`/member_illust.php?mode=medium&illust_id=${illust.illustId}`}
        title={illust.illustTitle}
      >
        {illust.illustTitle}
      </Link>
    </Text>
  )
}

const Link = styled.a`
  color: inherit;
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
  :focus {
    outline: auto currentColor;
  }
`
