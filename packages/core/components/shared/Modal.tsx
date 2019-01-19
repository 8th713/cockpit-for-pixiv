import React from 'react'
import styled from 'styled-components'
import { color, opacity } from '../theme'

type Props = {
  open?: boolean
  onRequestClose: () => unknown
  children?: React.ReactNode
}

export function Modal(props: Props) {
  const dialog = React.useRef<HTMLDialogElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === dialog.current) {
      props.onRequestClose()
    }
  }

  React.useEffect(
    () => {
      if (dialog.current === null) return
      const ref = dialog.current

      if (props.open) {
        if (ref.open === false) {
          dialog.current.showModal()
        }
      } else {
        if (ref.open) {
          dialog.current.close()
        }
      }
    },
    [props.open]
  )
  React.useEffect(
    () => {
      if (dialog.current === null) return

      function handleCancel(event: Event) {
        event.preventDefault()
        props.onRequestClose()
      }

      const ref = dialog.current
      ref.addEventListener('cancel', handleCancel)
      return () => ref.removeEventListener('cancel', handleCancel)
    },
    [props.onRequestClose]
  )

  return (
    <Layout ref={dialog} onClick={handleClick}>
      {props.children}
    </Layout>
  )
}

const Layout = styled.dialog`
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: 0;
  border: 0;
  padding: 0;
  background: unset;
  -webkit-font-smoothing: antialiased;
  font-family: 'Roboto', 'Helvetica Neue', 'arial', 'Noto Sans CJK JP',
    'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  letter-spacing: 0.03125em;
  text-decoration: none;
  text-transform: none;
  &:not([open]) {
    display: none;
  }
  &::backdrop {
    background: ${color.surface};
    opacity: ${opacity.disabled};
  }
`
