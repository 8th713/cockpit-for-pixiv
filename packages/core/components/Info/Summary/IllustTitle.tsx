import React from 'react'
import styled from 'styled-components'
import { AsyncStatus } from '../../../interfaces'
import { IllustProvider } from '../../../contexts'
import { Text } from '../../shared/Text'

export const IllustTitle = React.memo(function IllustTitle() {
  const result = IllustProvider.useValue()

  switch (result.status) {
    case AsyncStatus.Loading:
      return <Text as="h1" v="h6" />
    case AsyncStatus.Success: {
      const { value } = result

      return (
        <Text as="h1" v="h6">
          <Link
            href={`/member_illust.php?mode=medium&illust_id=${value.illustId}`}
          >
            {value.illustTitle}
          </Link>
        </Text>
      )
    }
    case AsyncStatus.Failure: {
      return (
        <Text as="h1" v="h6" c="error">
          取得できませんでした
        </Text>
      )
    }
  }
})

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
