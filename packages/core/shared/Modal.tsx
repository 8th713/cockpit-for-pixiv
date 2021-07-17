import { useEffect, useLayoutEffect, useRef } from 'react'
import { styled } from '../stitches.config'
import { typography } from './typography'

export interface ModalProps {
  children?: React.ReactNode
  onClose?: (event: Event) => void
  open?: boolean
}

export function Modal({ children, onClose, open }: ModalProps) {
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
    <Dialog ref={ref}>
      {open && (
        <>
          <Scrim onClick={() => ref.current?.close()} />
          <ScrollView>{children}</ScrollView>
        </>
      )}
    </Dialog>
  )
}

const Dialog = styled('dialog', {
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
  color: '$onSurface',
  textDecorationStyle: 'unset',
  textTransform: 'none',
  ...typography.body,
  '&:not([open])': {
    display: 'none',
  },
  '&::backdrop': {
    backgroundColor: 'transparent',
  },
})

const Scrim = styled('div', {
  cover: 0,
  backgroundColor: '$surface',
  opacity: 0.32,
})

const ScrollView = styled('div', {
  pointerEvents: 'none',
  cover: 0,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  '& > *': {
    pointerEvents: 'auto',
  },
})

if (__DEV__) {
  Dialog.displayName = 'Modal.Base'
  Scrim.displayName = 'Modal.Scrim'
  ScrollView.displayName = 'Modal.ScrollView'
}
