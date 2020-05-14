import React from 'react'
import styled from 'styled-components'
import { Badge, extend } from '../../components'
import { useScrollSpy } from './ScrollSpy'

interface Props {
  pages: Pixiv.Pages
}

export const Overlay = ({ pages }: Props) => {
  const [index, actions] = useScrollSpy()
  const needPrev = index > 0

  return (
    <Root onClick={(e) => e.stopPropagation()}>
      <BadgeContainer>
        <Badge sx={{ px: 3 }}>{`${index + 1} / ${pages.length}`}</Badge>
      </BadgeContainer>
      {needPrev && <Prev tabIndex={-1} onClick={actions.scrollPrev} />}
      <Next tabIndex={-1} onClick={actions.scrollNext} />
    </Root>
  )
}

const Root = styled.div(
  extend({
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  })
)

const BadgeContainer = styled.div(
  extend({
    position: 'sticky',
    top: 0,
    p: 2,
    textAlign: 'right',
  })
)

const Prev = styled.button(
  extend({
    pointerEvents: 'auto',
    position: 'sticky',
    top: 0,
    width: '100%',
    height: '20vh',
    m: 0,
    p: 0,
    borderWidth: 0,
    opacity: 0,
    bg: 'transparent',
    cursor:
      'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Cpath%20d%3D%22M177%20159.7l136%20136c9.4%209.4%209.4%2024.6%200%2033.9l-22.6%2022.6c-9.4%209.4-24.6%209.4-33.9%200L160%20255.9l-96.4%2096.4c-9.4%209.4-24.6%209.4-33.9%200L7%20329.7c-9.4-9.4-9.4-24.6%200-33.9l136-136c9.4-9.5%2024.6-9.5%2034-.1z%22%20stroke-width%3D%2230%22%20stroke%3D%22%23000%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E") 15 15, pointer',
  })
)

const Next = styled.button(
  extend({
    pointerEvents: 'auto',
    position: 'sticky',
    top: 'calc(60vh - var(--caption-height))',
    width: '100%',
    height: '40vh',
    m: 0,
    p: 0,
    borderWidth: 0,
    opacity: 0,
    bg: 'transparent',
    cursor:
      'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Cpath%20d%3D%22M143%20352.3L7%20216.3c-9.4-9.4-9.4-24.6%200-33.9l22.6-22.6c9.4-9.4%2024.6-9.4%2033.9%200l96.4%2096.4%2096.4-96.4c9.4-9.4%2024.6-9.4%2033.9%200l22.6%2022.6c9.4%209.4%209.4%2024.6%200%2033.9l-136%20136c-9.2%209.4-24.4%209.4-33.8%200z%22%20stroke-width%3D%2230%22%20stroke%3D%22%23000%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E") 15 15, pointer',
  })
)

if (__DEV__) {
  Root.displayName = 'Overlay.Root'
  BadgeContainer.displayName = 'Overlay.BadgeContainer'
  Prev.displayName = 'Overlay.Prev'
  Next.displayName = 'Overlay.Next'
}
