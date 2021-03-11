import { styled } from '../stitches.config'

export type DividerProps = React.ComponentProps<typeof Divider>

export const Divider = styled('div', {
  boxSizing: 'border-box',
  width: 'initial',
  height: 'initial',
  minHeight: 1,
  minWidth: 1,
  flexGrow: 0,
  flexShrink: 0,
  margin: 0,
  padding: 0,
  borderWidth: 0,
  backgroundColor: '$onSurface',
  opacity: 0.12,
})

if (__DEV__) {
  Divider.displayName = 'Divider'
}
