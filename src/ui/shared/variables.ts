import { css } from 'styled-components'

export const colors = {
  primary: '#2196f3',
  backdrop: 'rgba(0, 0, 0, 0.54)'
}

export const light = {
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)'
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: '#fff',
    default: '#fafafa',
    appBar: '#f5f5f5',
    chip: '#e0e0e0',
    avatar: '#bdbdbd'
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.14)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)'
  }
}

export const dark = {
  text: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#424242',
    default: '#303030',
    appBar: '#212121',
    chip: '#616161',
    avatar: '#757575'
  },
  action: {
    active: 'rgba(255, 255, 255, 1)',
    hover: 'rgba(255, 255, 255, 0.14)',
    selected: 'rgba(255, 255, 255, 0.8)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)'
  }
}

export const typography = {
  headline: css`
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
  `,
  subhead: css`
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.04em;
    line-height: 24px;
  `,
  body2: css`
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 24px;
  `,
  body1: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  `,
  caption: css`
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.08em;
    line-height: 16px;
  `,
  button: css`
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.04em;
    line-height: 20px;
  `
}
