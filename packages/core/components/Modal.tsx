import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { extend, sx, SxProps, themeGet } from './utils'

export interface ModalProps extends SxProps {
  backdrop?: boolean
  backdropSx?: SxProps['sx']
  children?: React.ReactNode
  onBackdropClick?: React.MouseEventHandler<HTMLDivElement>
  onCancel?: (event: Event) => unknown
  onClose?: (event: Event) => unknown
  open?: boolean
}

export const Modal = ({
  backdrop,
  backdropSx,
  children,
  onBackdropClick,
  onCancel,
  onClose,
  open,
  ...props
}: ModalProps) => {
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

  const useBackdrop = !!onBackdropClick || backdrop

  return (
    <Dialog ref={ref} {...props}>
      {open && (
        <>
          {useBackdrop && (
            <Backdrop onClick={onBackdropClick} sx={backdropSx} />
          )}
          <ScrollView>{children}</ScrollView>
        </>
      )}
    </Dialog>
  )
}

const Dialog = styled.dialog<SxProps>(
  extend({
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'auto',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    p: 0,
    border: 0,
    backgroundColor: 'transparent',
    color: 'onSurface',
    // WebkitFontSmoothing: 'antialiased',
    fontFamily: 'sans',
    textDecoration: 'none',
    textTransform: 'none',
    variant: 'text.body1',
    '&:not([open])': {
      display: 'none',
    },
    '&::backdrop': {
      backgroundColor: 'transparent',
    },
  }),
  sx
)

const Backdrop = styled.div<SxProps>(
  extend({
    position: 'sticky',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    bg: 'surface',
    opacity: themeGet('opacities.disabled'),
  }),
  sx
)

const ScrollView = styled.div(
  extend({
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  })
)

if (__DEV__) {
  Dialog.displayName = 'Modal.Root'
  Backdrop.displayName = 'Modal.Backdrop'
  ScrollView.displayName = 'Modal.ScrollView'
}
