import { keyframes, styled } from '../stitches.config'

export type DialogProps = React.ComponentProps<typeof Dialog>
export type DialogHeaderProps = React.ComponentProps<typeof DialogHeader>
export type DialogContentProps = React.ComponentProps<typeof DialogContent>
export type DialogFooterProps = React.ComponentProps<typeof DialogFooter>

export const Dialog = styled('section', {
  pointerEvents: 'auto',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 960,
  minWidth: 280,
  maxHeight: '95vh',
  overflow: 'hidden',
  margin: 'auto',
  borderRadius: 4,
  backgroundColor: '$surface',
  color: '$onSurface',
  boxShadow:
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  animationName: keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }).toString(),
  animationDuration: '150ms',
  animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
})

export const DialogHeader = styled('header', {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  height: '$lgH',
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: 'auto',
  margin: 0,
  paddingX: 24,
})

export const DialogContent = styled('div', {
  boxSizing: 'border-box',
  overflow: 'auto',
  minWidth: 0,
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',
  margin: 0,
  paddingX: 24,
  paddingY: '$2',
})

export const DialogFooter = styled('footer', {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  minWidth: 0,
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: 'auto',
  margin: 0,
  padding: '$2',
  columnGap: '$2',
})

if (__DEV__) {
  Dialog.displayName = 'Dialog'
  DialogHeader.displayName = 'Dialog.Header'
  DialogContent.displayName = 'Dialog.Content'
  DialogFooter.displayName = 'Dialog.Footer'
}
