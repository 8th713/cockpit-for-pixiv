import styled from 'styled-components'

type Color = 'primary' | 'secondary' | 'error'
type Kind = 'b1' | 'b2' | 'caption' | 'overline'

type Props = {
  color?: Color
  kind?: Kind
  low?: boolean
}

export const Text = styled.p.attrs((props: Props) => ({
  'data-low': props.low,
  'data-color': props.color,
  'data-kind': props.kind
}))<Props>`
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--on-surface);
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: 'Roboto', 'Helvetica Neue', 'arial', 'Noto Sans CJK JP',
    'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;

  &:not([data-color]) {
    opacity: var(--high);
  }
  &[data-low]:not([data-color]) {
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
  h1&& {
    opacity: 1;
    font-size: 1.25em;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: 0.0075em;
  }
  h2&& {
    opacity: 1;
    font-size: 1em;
    font-weight: 400;
    line-height: 1.75;
    letter-spacing: 0.00938em;
  }
  h3&& {
    opacity: 1;
    font-size: 0.875em;
    font-weight: 500;
    line-height: 1.57;
    letter-spacing: 0.00714em;
  }
  &&[data-kind='b1'] {
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }
  &&[data-kind='b2'] {
    font-size: 0.875em;
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: 0.01071em;
  }
  &&[data-kind='caption'] {
    font-size: 0.75em;
    font-weight: 400;
    line-height: 1.25em;
    letter-spacing: 0.03333em;
  }
  &&[data-kind='overline'] {
    font-size: 0.75em;
    font-weight: 400;
    line-height: 2em;
    letter-spacing: 0.16667em;
    text-decoration: none;
    text-transform: uppercase;
  }
`
