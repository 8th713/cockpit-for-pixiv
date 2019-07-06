import { css } from 'styled-components'

export const fontPresets = {
  h1: css`
    font-size: 20px;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: 0.0075em;
  `,
  h2: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 1.75;
    letter-spacing: 0.00938em;
  `,
  h3: css`
    font-size: 14px;
    font-weight: 500;
    line-height: 1.57;
    letter-spacing: 0.00714em;
  `,
  body1: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  `,
  body2: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: 0.01071em;
  `,
  button: css`
    font-size: 14px;
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
  `,
  caption: css`
    font-size: 12px;
    font-weight: 400;
    line-height: 1.66;
    letter-spacing: 0.03333em;
  `,
  overline: css`
    font-size: 12px;
    font-weight: 400;
    line-height: 2.66;
    letter-spacing: 0.08333em;
    text-transform: uppercase;
  `
}

export const link = css`
  cursor: pointer;
  color: var(--primary);
  :hover {
    text-decoration: none;
  }
  :focus {
    outline: auto currentColor;
  }
`
