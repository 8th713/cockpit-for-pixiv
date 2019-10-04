import styled from 'styled-components'
import { createTransition } from './transitions'
import { ComponentSet, extend, sx, SxProps, themeGet, variant } from './utils'

type ButtonsVars = 'primary' | 'secondary' | 'outlined' | 'inherit'

export interface ButtonProps extends SxProps {
  variant?: ButtonsVars
}

type ButtonType = ComponentSet<
  'button',
  ButtonProps,
  {
    Link: typeof Link
  }
>

export const Button: ButtonType = styled.button<ButtonProps>(
  extend({
    WebkitAppearance: 'none',
    userSelect: 'none',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    height: 36,
    px: 3,
    borderWidth: 0,
    borderRadius: 18,
    textAlign: 'center',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    variant: 'text.button',
    transition: createTransition('opacity'),
    ':focus': {
      outline: 0
    },
    ':disabled': {
      pointerEvents: 'none',
      cursor: 'default',
      opacity: themeGet('opacities.disabled')
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
      bg: '#fff',
      opacity: 0,
      transition: createTransition('opacity')
    },
    '&:hover::after': {
      opacity: themeGet('opacities.hover')
    },
    '&:focus::after': {
      opacity: themeGet('opacities.focus')
    }
  }),
  variant('variant', {
    primary: {
      bg: 'primary',
      color: 'onPrimary',
      ':disabled': {
        bg: 'onSurface',
        color: 'surface'
      }
    },
    secondary: {
      bg: 'secondary',
      color: 'onSecondary',
      ':disabled': {
        bg: 'onSurface',
        color: 'surface'
      }
    },
    outlined: {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'currentColor',
      bg: 'transparent',
      color: 'primary',
      ':disabled': {
        color: 'onSurface'
      }
    },
    inherit: {
      bg: 'transparent',
      color: 'inherit',
      ':disabled': {
        bg: 'onSurface',
        color: 'surface'
      }
    }
  }),
  sx
) as any
Button.defaultProps = {
  variant: 'primary'
}

const Link = Button.withComponent('a')
Link.defaultProps = {
  variant: 'primary'
}

Button.Link = Link

if (__DEV__) {
  Button.displayName = 'Button'
  Link.displayName = 'Button.Link'
}
