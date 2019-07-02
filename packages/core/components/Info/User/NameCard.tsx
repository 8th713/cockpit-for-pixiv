import React from 'react'
import styled from 'styled-components'
import { AccountError } from '../../shared/Icon'
import { useUser } from './UserHost'

export function NameCard() {
  const { read } = useUser()
  const user = read()

  if (!user) {
    return (
      <Link>
        <AccountError width="40" height="40" />
        <Name>取得できませんでした</Name>
      </Link>
    )
  }

  return (
    <Link href={`https://www.pixiv.net/member.php?id=${user.userId}`}>
      <Avatar src={user.image} />
      <Name>{user.name}</Name>
    </Link>
  )
}

const Link = styled.a`
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  color: var(--on-surface);
  text-decoration: none;
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
    opacity: var(--enabled);
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
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
const Name = styled.span`
  margin-left: 16px;
`
