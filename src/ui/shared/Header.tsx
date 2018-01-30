import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Illust } from '../../store'
import { colors, dark, typography } from './variables'

interface Props {
  illust: Illust
}

export const Header = observer(({ illust }: Props) => (
  <Root>
    <Avatar>
      <Img src={illust.authorAvatar} alt={illust.authorName} />
    </Avatar>
    <Content>
      <Title>
        <Link href={illust.illustURL} title={illust.title}>
          {illust.title}
        </Link>
      </Title>
      <Author>
        <Link href={illust.authorHref} title={illust.authorName}>
          {illust.authorName}
        </Link>
      </Author>
    </Content>
  </Root>
))

const Root = styled.header`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-gap: 16px;
  align-items: center;
  padding: 16px;
  background-color: ${colors.primary};
`

const Avatar = styled.div`
  overflow: hidden;
  align-self: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${dark.background.avatar};
`

const Content = styled.div`
  overflow: hidden;
  white-space: nowrap;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
`

const Author = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${dark.text.secondary};
`

const Title = Author.extend`
  color: ${dark.text.primary};
  ${typography.subhead};
`

const Link = styled.a`
  color: inherit;
`
