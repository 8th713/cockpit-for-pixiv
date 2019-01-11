import React from 'react'
import styled from 'styled-components'
import { prop, switchProp } from 'styled-tools'
import { color } from '../theme'

const colors = {
  default: 'currentColor',
  error: color.error,
  inherit: 'inherit',
  primary: color.primary,
  secondary: color.secondary,
  textPrimary: color.surfaceText,
  textSecondary: color.surfaceText2
}

type Props = React.ComponentPropsWithoutRef<'svg'> & {
  c?: keyof typeof colors
  children?: never
}

export const BookmarkOff: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
  </Svg>
)
export const BookmarkOn: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </Svg>
)
export const Bug: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z" />
  </Svg>
)
export const CheckboxOff: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />
  </Svg>
)
export const CheckboxOn: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
  </Svg>
)
export const DateTime: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </Svg>
)
export const Download: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
  </Svg>
)
export const ExpandLess: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
  </Svg>
)
export const ExpandMore: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </Svg>
)
export const FitContain: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" />
  </Svg>
)
export const FitCover: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M11,16V13H13V16L17,12L13,8V11H11V8L7,12L11,16M3,20H5V4H3V20M19,20H21V4H19V20Z" />
  </Svg>
)
export const FitNone: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
  </Svg>
)
export const Help: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
  </Svg>
)
export const Like: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M 5.337 11.584 C 2.772 11.584 1.168 8.807 2.452 6.587 C 3.046 5.556 4.145 4.921 5.337 4.921 C 7.902 4.921 9.504 7.698 8.222 9.919 C 7.627 10.949 6.527 11.584 5.337 11.584 Z M 18.663 11.584 C 16.098 11.584 14.495 8.807 15.778 6.587 C 16.373 5.556 17.472 4.921 18.663 4.921 C 21.228 4.921 22.831 7.698 21.548 9.919 C 20.953 10.949 19.853 11.584 18.663 11.584 Z M 5.52 16.399 C 4.612 15.49 5.028 13.941 6.267 13.609 C 6.842 13.454 7.456 13.62 7.877 14.041 C 10.154 16.319 13.846 16.319 16.123 14.041 C 17.046 13.149 18.587 13.591 18.896 14.835 C 19.034 15.394 18.878 15.984 18.478 16.396 C 14.9 19.974 9.1 19.974 5.522 16.396 Z" />
  </Svg>
)
export const Padding: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M22 18v-2H8V4h2L7 1 4 4h2v2H2v2h4v8c0 1.1.9 2 2 2h8v2h-2l3 3 3-3h-2v-2h4zM10 8h6v6h2V8c0-1.1-.9-2-2-2h-6v2z" />
  </Svg>
)
export const Spread: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3" />
  </Svg>
)
export const SpreadNone: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M20,3H3A1,1 0 0,0 2,4V10A1,1 0 0,0 3,11H20A1,1 0 0,0 21,10V4A1,1 0 0,0 20,3M20,13H3A1,1 0 0,0 2,14V20A1,1 0 0,0 3,21H20A1,1 0 0,0 21,20V14A1,1 0 0,0 20,13Z" />
  </Svg>
)
export const SpreadShift: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M13,13V21H21V13H13ZM3,21H11V13H3V13ZM3,3V11H11V3H3Z" />
  </Svg>
)
export const Tweet: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
  </Svg>
)
export const ViewCount: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </Svg>
)
export const Add: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </Svg>
)
export const Refresh: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
  </Svg>
)
export const Account: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </Svg>
)
export const AccountError: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    <Path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      c="error"
    />
  </Svg>
)
export const Play: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M8 5v14l11-7z" />
  </Svg>
)
export const Pause: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </Svg>
)
export const Stop: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M6 6h12v12H6z" />
  </Svg>
)
export const Collections: React.FC<Props> = props => (
  <Svg aria-hidden={true} {...props}>
    <Path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
  </Svg>
)

type SvgProps = React.ComponentPropsWithoutRef<'svg'> & {
  c?: keyof typeof colors
  children?: React.ReactNode
}

const Svg = styled.svg<SvgProps>`
  user-select: none;
  display: inline-block;
  fill: ${switchProp(prop('c', 'default'), colors)};
  flex-shrink: 0;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1);
`
// @ts-ignore
Svg.defaultProps = {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  focusable: 'false'
}

type PathProps = React.ComponentPropsWithoutRef<'path'> & {
  c?: keyof typeof colors
  children?: never
}

const Path = styled.path<PathProps>`
  fill: ${switchProp(prop('c', 'inherit'), colors)};
`
