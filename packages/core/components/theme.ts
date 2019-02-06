import { css } from 'styled-components'

// https://material.io/design/color/text-legibility.html#text-backgrounds
export const opacity = {
  high: 0.87,
  medium: 0.6,
  disabled: 0.38,
  divider: 0.12
}

// https://coolors.co/0b132b-55cfff-ff9100-d32f2f-ffffff
export const color = {
  surface: '#0b132b',
  surfaceText: `rgba(255, 255, 255, ${opacity.high})`,
  surfaceText2: `rgba(255, 255, 255, ${opacity.medium})`,
  primary: '#55cfff',
  primaryText: `rgba(0, 0, 0, ${opacity.high})`,
  secondary: '#ff9100',
  secondaryText: `rgba(0, 0, 0, ${opacity.high})`,
  error: '#d32f2f',
  errorText: `rgba(255, 255, 255, ${opacity.high})`,
  divider: `rgba(255, 255, 255, ${opacity.divider})`
}

// https://coolors.co/ffffe5-1c9cff-52f262-ff3f4c-000000
// export const color = {
//   surface: '#ffffe5',
//   surfaceText: `rgba(0, 0, 0, ${opacity.high})`,
//   surfaceText2: `rgba(0, 0, 0, ${opacity.medium})`,
//   primary: '#1c9cff',
//   primaryText: `rgba(255, 255, 255, ${opacity.high})`,
//   secondary: '#52f262',
//   secondaryText: `rgba(0, 0, 0, ${opacity.high})`,
//   error: '#ff3f4c',
//   errorText: `rgba(255, 255, 255, ${opacity.high})`,
//   divider: `rgba(0, 0, 0, ${opacity.divider})`
// }

export const ripple = css`
  position: relative;
  outline: none;
  overflow: hidden;
  &:hover {
    text-decoration: none;
  }

  /* Overlay */
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
    transform-origin: center;
    transform: scale(0);
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1),
      transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  /* Ripple */
  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    background: currentColor;
    opacity: 0;
    transform-origin: center;
    transform: scale(1.5);
    transition: opacity 350ms cubic-bezier(0.4, 0, 0.2, 1),
      transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:disabled {
    pointer-events: none;
    opacity: ${opacity.disabled};
  }
  &:hover::before {
    opacity: 0.04;
    transform: scale(1);
  }
  &:focus::before {
    opacity: 0.12;
    transform: scale(1);
  }
  &:active::after {
    opacity: 0.16;
    transform: scale(0.4);
    transition-duration: 20ms, 0s;
  }
`
