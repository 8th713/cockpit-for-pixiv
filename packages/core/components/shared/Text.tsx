import React from 'react'
import styled from 'styled-components'
import { fontPresets } from './styles'

type Color = 'primary' | 'secondary' | 'error'
type Kind = 'h1' | 'h2' | 'h3' | 'b1' | 'b2' | 'button' | 'caption' | 'overline'

type Props = React.ComponentPropsWithoutRef<'span'> & {
  as?: keyof JSX.IntrinsicElements
  color?: Color
  kind?: Kind
  low?: boolean
  noWrap?: boolean
  margin?: boolean
}

export const Text = React.forwardRef<HTMLParagraphElement, Props>(
  ({ as, color, kind = 'b1', low, noWrap, margin, ...props }, ref) => {
    switch (kind) {
      case 'h1':
      case 'h2':
      case 'h3':
        as = as || kind
        break
      case 'b1':
      case 'b2':
        as = as || 'p'
        break
      default:
        break
    }
    return (
      <Root
        ref={ref}
        as={as}
        data-no-wrap={noWrap}
        data-low={low}
        data-color={color}
        data-kind={kind}
        {...props}
        style={{ marginBottom: margin ? 16 : undefined, ...props.style }}
      />
    )
  }
)

const Root = styled.span`
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--on-surface);
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: 'Roboto', 'Helvetica Neue', 'arial', 'Noto Sans CJK JP',
    'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
  ${fontPresets.body1};

  &:not([data-color]) {
    opacity: var(--high);
  }
  &[data-no-wrap='true'] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &[data-low='true']:not([data-color]) {
    opacity: var(--medium);
  }
  &[data-color='primary'] {
    color: var(--primary);
  }
  &[data-color='secondary'] {
    color: var(--secondary);
  }
  &[data-color='error'] {
    color: var(--error);
  }
  &[data-kind='h1'] {
    opacity: 1;
    ${fontPresets.h1};
  }
  &[data-kind='h2'] {
    opacity: 1;
    ${fontPresets.h2};
  }
  &[data-kind='h3'] {
    opacity: 1;
    ${fontPresets.h3};
  }
  &[data-kind='b1'] {
    ${fontPresets.body1};
  }
  &[data-kind='b2'] {
    ${fontPresets.body2};
  }
  &[data-kind='button'] {
    ${fontPresets.button};
  }
  &[data-kind='caption'] {
    ${fontPresets.caption};
  }
  &[data-kind='overline'] {
    ${fontPresets.overline};
  }
`
