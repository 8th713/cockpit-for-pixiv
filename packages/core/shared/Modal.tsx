import { useEffect, useLayoutEffect, useRef } from 'react'
import { styled } from '../stitches.config'

export interface ModalProps {
  open?: boolean
  onClose?: (event: Event) => void
  children?: React.ReactNode
}

// interface HTMLDialogElement extends HTMLElement {
//   readonly open: boolean
//   readonly returnValue: string
//   showModal(): void
//   close(returnValue?: string): void
// }

export function Modal({ open, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
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

    const handleClose = (event: Event) => {
      if (!onClose) return
      onClose(event)
    }

    node.addEventListener('close', handleClose)
    return () => node.removeEventListener('close', handleClose)
  }, [onClose])

  return (
    <ModalContainer ref={ref}>
      {open && <ModalScrim onClick={() => ref.current?.close()} />}
      {open && <ModalContent>{children}</ModalContent>}
    </ModalContainer>
  )
}

const ModalContainer = styled('dialog', {
  boxSizing: 'border-box',
  position: 'fixed',
  inset: 0,
  overflow: 'auto',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  maxHeight: '100%',
  margin: 0,
  padding: 0,
  border: 0,
  backgroundColor: 'transparent',
  '&:not([open])': {
    display: 'none',
  },
  '&::backdrop': {
    backgroundColor: 'transparent',
  },
})

const ModalScrim = styled('div', {
  baseStyle: true,
  cover: 0,
  backgroundColor: '$surface',
  opacity: '$backdrop',
})

const ModalContent = styled('div', {
  pointerEvents: 'none',
  boxSizing: 'border-box',
  cover: 0,
  display: 'flex',
  flexDirection: 'column',
  size: '$full',
  color: '$onSurface',
  textStyle: '$body',
  textDecorationStyle: 'unset',
  textTransform: 'none',
  '& > *': {
    pointerEvents: 'auto',
  },
})
