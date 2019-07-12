import React from 'react'
import styled from 'styled-components'
import { useServices } from '../../Services'
import { AccountError, Box } from '../../shared'

type Props = {
  id: string
}

export function NameCard({ id }: Props) {
  const { useUser } = useServices()
  const user = useUser(id)

  if (!user)
    return (
      <Link>
        <AccountError width="40" height="40" />
        <Box ml={3}>取得できませんでした</Box>
      </Link>
    )

  return (
    <Link href={`https://www.pixiv.net/member.php?id=${user.userId}`}>
      <Avatar src={user.image} />
      <Box ml={3}>{user.name}</Box>
    </Link>
  )
}

const Link = styled.a`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  display: flex;
  overflow: hidden;
  padding: 8px 16px;
  border-radius: 8px;
  color: var(--on-surface);
  text-decoration: none;
  align-items: center;
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 15ms linear;
  }
  &:hover {
    text-decoration: none;
    &::before {
      opacity: var(--hovered);
    }
  }
  &:focus {
    outline: auto var(--primary);
    &::before {
      opacity: var(--focused);
    }
  }
  &:active {
    &::before {
      opacity: var(--pressed);
    }
  }
`
const Avatar = styled.img`
  all: unset;
  user-select: none;
  object-fit: cover;
  width: 40px;
  height: 40px;
  background-color: var(--surface);
  border-radius: 50%;
`
