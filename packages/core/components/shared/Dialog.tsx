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
  width: 100%;
  height: 100%;
  display: flex;
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 960px;
  min-width: 280px;
  max-height: 95vh;
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
Dialog.Header = styled.header`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin: 0;
  padding: 16px 24px;
`
Dialog.Content = styled.div`
  box-sizing: border-box;
  overflow: auto;
  display: block;
  flex: 1 1 auto;
  padding: 8px 24px;
`
Dialog.Action = styled.footer`
  flex: 0 0 auto;
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: flex-end;
`
Dialog.Divider = styled.div`
  flex: 0 0 1px;
  margin: 0 24px;
  background-color: var(--on-surface);
  opacity: var(--divider);
`
