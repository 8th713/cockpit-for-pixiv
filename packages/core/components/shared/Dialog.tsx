import React from 'react'
import styled from 'styled-components'

type Props = React.ComponentPropsWithoutRef<'section'> & {
  backdrop?: boolean
  onBackdropClick?: React.MouseEventHandler<HTMLDivElement>
}

export function Dialog({ backdrop = true, onBackdropClick, ...props }: Props) {
  return (
    <Root>
      {backdrop && <Backdrop onClick={onBackdropClick} />}
      <Layout {...props} />
    </Root>
  )
}

const Root = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`
const Backdrop = styled.div`
  pointer-events: auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const Layout = styled.section`
  pointer-events: auto;
  position: relative;
  display: flex;
  max-width: 960px;
  min-width: 280px;
  max-height: 95vh;
  overflow: hidden;
  flex-direction: column;
  margin: auto;
  border-radius: 8px;
  background-color: var(--surface);
  ::after {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--on-surface);
    opacity: 0.16;
  }
`
const Header = styled.header`
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  margin: 0;
  padding: 16px 24px;
  align-items: center;
`
const Content = styled.div`
  box-sizing: border-box;
  display: block;
  overflow: auto;
  flex: 1 1 auto;
  padding: 8px 24px;
`
const Action = styled.footer`
  flex: 0 0 auto;
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: flex-end;
`
const Divider = styled.div`
  flex: 0 0 1px;
  margin: 0 24px;
  background-color: var(--on-surface);
  opacity: var(--divider);
`

Dialog.Header = Header
Dialog.Content = Content
Dialog.Action = Action
Dialog.Divider = Divider
