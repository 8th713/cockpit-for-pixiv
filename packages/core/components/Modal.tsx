import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

type Props = {
  open?: boolean
  onCancel?: (event: Event) => unknown
  onClose?: (event: Event) => unknown
  children?: React.ReactNode
}

export const Modal = ({ open, onCancel, onClose, children }: Props) => {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (open) {
      node.showModal()
    } else {
      node.close()
    }
  }, [open])
  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleCancel = (event: Event) => {
      if (!onCancel) return
      onCancel(event)
    }

    node.addEventListener('cancel', handleCancel)
    return () => node.removeEventListener('cancel', handleCancel)
  }, [onCancel])
  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleClose = (event: Event) => {
      if (!onClose) return
      onClose(event)
    }

    node.addEventListener('close', handleClose)
    return () => node.removeEventListener('close', handleClose)
  }, [onClose])

  return <Root ref={ref}>{open && children}</Root>
}

const Root = styled.dialog`
  /* Color */
  --surface: #0b132b;
  --on-surface: #fff;
  --primary: #55cfff;
  --on-primary: #000;
  --secondary: #ff9100;
  --on-secondary: #000;
  --error: #f28d85;
  --on-error: #000;

  /* Text legibility */
  --high: 0.87;
  --medium: 0.6;
  --low: 0.38;

  /* Ripple opacity */
  --enabled: 0;
  --hovered: 0.04;
  --focused: 0.12;
  --pressed: 0.1;
  --divider: 0.12;
  --disabled: 0.38;

  --caption-height: 56px;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--on-surface);
  -webkit-font-smoothing: antialiased;
  font-family: Roboto, Helvetica Neue, arial, Noto Sans CJK JP,
    Hiragino Kaku Gothic ProN, Meiryo, sans-serif;
  ${({ theme }) => theme.textStyles.body1};
  text-decoration: none;
  text-transform: none;
  &:not([open]) {
    display: none;
  }
  &::backdrop {
    background: #0b132b;
    opacity: 0.38;
  }
`
