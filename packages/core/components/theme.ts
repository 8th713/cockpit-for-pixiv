import { DefaultTheme, CSSObject } from 'styled-components'

const body1: CSSObject = {
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '1.5',
  letterSpacing: '0.00938em'
}
const body2: CSSObject = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '1.43',
  letterSpacing: '0.01071em'
}

export const theme: DefaultTheme = {
  colors: {
    surface: 'var(--surface)',
    onSurface: 'var(--on-surface)',
    primary: 'var(--primary)',
    onPrimary: 'var(--on-primary)',
    secondary: 'var(--secondary)',
    onSecondary: 'var(--on-secondary)',
    error: 'var(--error)',
    onError: 'var(--on-error)'
  },
  colorStyles: {
    primary: {
      color: 'var(--primary)',
      opacity: 1
    },
    secondary: {
      color: 'var(--secondary)',
      opacity: 1
    },
    error: {
      color: 'var(--error)',
      opacity: 1
    }
  },
  textStyles: {
    h1: {
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '1.6',
      letterSpacing: '0.0075em'
    },
    h2: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.75',
      letterSpacing: '0.00938em'
    },
    h3: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '1.57',
      letterSpacing: '0.00714em'
    },
    button: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '1.75',
      letterSpacing: '0.02857em',
      textTransform: 'uppercase'
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.66',
      letterSpacing: '0.03333em'
    },
    overline: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '2.66',
      letterSpacing: '0.08333em',
      textTransform: 'uppercase'
    },
    body1,
    body2,
    b1: body1,
    b2: body2
  },
  buttons: {
    text: {
      padding: '6px 8px',
      color: 'var(--bg-color)',
      ':disabled': {
        color: 'var(--on-surface)'
      }
    },
    outlined: {
      color: 'var(--bg-color)',
      // outline
      '::after': {
        content: '""',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        border: '2px solid currentColor',
        borderRadius: 'inherit',
        transition: 'opacity 15ms cubic-bezier(0.4, 0, 0.2, 1)'
      },
      ':disabled': {
        color: 'var(--on-surface)',
        '::after': {
          opacity: 'var(--divider)' as any
        }
      }
    },
    contained: {
      '--multiplier': '2',
      '--overlay-color': 'var(--on-surface)',
      backgroundColor: 'var(--bg-color, #808080)',
      color: 'var(--text-color)',
      // outline
      '::after': {
        content: '""',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        border: '2px solid var(--on-surface)',
        borderRadius: 'inherit',
        opacity: 0,
        transition: 'opacity 15ms cubic-bezier(0.4, 0, 0.2, 1)'
      },
      ':focus': {
        '::after': {
          opacity: 1
        }
      },
      ':disabled': {
        backgroundColor: 'transparent',
        color: 'var(--on-surface)',
        '::before': {
          opacity: 'var(--divider)' as any
        }
      }
    }
  },
  buttonColorStyles: {
    primary: {
      '--bg-color': 'var(--primary)',
      '--text-color': 'var(--on-primary)'
    },
    secondary: {
      '--bg-color': 'var(--secondary)',
      '--text-color': 'var(--on-secondary)'
    },
    error: {
      '--bg-color': 'var(--error)',
      '--text-color': 'var(--on-error)'
    }
  }
}
