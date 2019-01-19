import React from 'react'
import styled from 'styled-components'
import { color, ripple } from '../theme'
import { AsyncStatus } from '../../interfaces'
import { UserProvider } from '../../contexts'
import { Progress } from '../shared/Progress'
import { AccountError } from '../shared/Icon'

export function Row() {
  const result = UserProvider.useValue()

  switch (result.status) {
    case AsyncStatus.Loading: {
      return (
        <Layout>
          <Progress size={40} />
          読み込み中
        </Layout>
      )
    }
    case AsyncStatus.Success: {
      const { value } = result

      return (
        <Layout href={`https://www.pixiv.net/member.php?id=${value.userId}`}>
          <Avatar src={value.image} />
          {value.name}
        </Layout>
      )
    }
    case AsyncStatus.Failure: {
      return (
        <Layout>
          <AccountError width="40" height="40" />
          取得できませんでした
        </Layout>
      )
    }
  }
}

const Layout = styled.a`
  all: unset;
  cursor: pointer;
  height: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 40px 1fr;
  gap: 16px;
  color: ${color.surfaceText};
  ${ripple};
`
const Avatar = styled.img`
  all: unset;
  user-select: none;
  object-fit: cover;
  width: 40px;
  height: 40px;
  background-color: ${color.surfaceText};
  border-radius: 50%;
`
