import styled, { css, keyframes } from 'styled-components'
import { duration, easing } from './transitions'
import { ComponentSet, extend, sx, SxProps } from './utils'

export interface DialogProps extends SxProps {}

type DialogType = ComponentSet<
  'section',
  DialogProps,
  {
    Header: typeof Header
    Content: typeof Content
    Footer: typeof Footer
  }
>

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
})

export const Dialog: DialogType = styled.section<DialogProps>(
  extend({
    pointerEvents: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 960,
    minWidth: 280,
    maxHeight: '95vh',
    overflow: 'hidden',
    m: 'auto',
    borderRadius: 4,
    backgroundColor: 'surface',
    color: 'onSurface',
    boxShadow: 24
  }),
  css`
    animation: ${fadeIn} ${duration.smallIn} ${easing.standard};
  `,
  sx
) as any

const Header = styled.header<SxProps>(
  extend({
    display: 'flex',
    alignItems: 'center',
    flex: '0 0 auto',
    height: 64,
    px: 24
  }),
  sx
)
Dialog.Header = Header

const Content = styled.div<SxProps>(
  extend({
    overflow: 'auto',
    flex: '1 1 auto',
    px: 24,
    pt: 12,
    pb: 2
  }),
  sx
)
Dialog.Content = Content

const Footer = styled.footer<SxProps>(
  extend({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: '0 0 auto',
    p: 2,
    '& > :not(:first-child)': {
      ml: 2
    }
  }),
  sx
)
Dialog.Footer = Footer

if (__DEV__) {
  Dialog.displayName = 'Dialog'
  Header.displayName = 'Dialog.Header'
  Content.displayName = 'Dialog.Content'
  Footer.displayName = 'Dialog.Footer'
}
