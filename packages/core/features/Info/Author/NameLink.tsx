import { duration, easing, styled } from '../../../stitches.config'

export const NameLink = styled('a', {
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  height: '$mdH',
  paddingX: '$3',
  borderRadius: 4,
  columnGap: '$3',
  color: '$onSurface',
  text: '$h2',
  textDecorationLine: 'none',
  outlineStyle: 'none',
  '::after': {
    content: '""',
    pointerEvents: 'none',
    boxSizing: 'inherit',
    cover: 0,
    borderRadius: 'inherit',
    backgroundColor: 'currentColor',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: duration.simple,
    transitionTimingFunction: easing.standard,
  },
  '&:hover::after': {
    opacity: 0.12,
  },
  '&:focus-visible::after': {
    opacity: 0.24,
  },
})

if (__DEV__) {
  NameLink.displayName = 'NameLink'
}
