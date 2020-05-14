import styled from 'styled-components'
import { createTransition } from './transitions'
import { ComponentSet, extend, sx, SxProps, themeGet } from './utils'

export interface IconButtonProps extends SxProps {}

type IconButtonType = ComponentSet<
  'button',
  IconButtonProps,
  {
    Link: typeof Link
  }
>

export const IconButton: IconButtonType = styled.button<IconButtonProps>(
  extend({
    WebkitAppearance: 'none',
    userSelect: 'none',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    m: 0,
    borderWidth: '0',
    borderRadius: '50%',
    bg: 'transparent',
    color: 'inherit',
    textAlign: 'center',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: createTransition('opacity'),
    ':focus': {
      outline: 0,
    },
    ':disabled': {
      pointerEvents: 'none',
      cursor: 'default',
      opacity: themeGet('opacities.disabled'),
    },
    '::after': {
      content: '""',
      pointerEvents: 'none',
      boxSizing: 'inherit',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      bg: 'currentColor',
      opacity: 0,
      transition: createTransition('opacity'),
    },
    '&:hover::after': {
      opacity: themeGet('opacities.hover'),
    },
    '&:focus::after': {
      opacity: themeGet('opacities.focus'),
    },
  } as any),
  sx
) as any

const Link = IconButton.withComponent('a')
IconButton.Link = Link

if (__DEV__) {
  IconButton.displayName = 'IconButton'
  Link.displayName = 'IconButton.Link'
}
