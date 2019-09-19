import styled from 'styled-components'
import * as sys from 'styled-system'
import { Box, BoxProps } from './Box'

export interface EmProps {
  em?: sys.ResponsiveValue<'high' | 'medium' | 'low' | number>
}
export interface TextOverflowProps {
  textOverflow?: 'clip' | 'ellipsis'
}
export interface TextProps
  extends BoxProps,
    sys.STextStyleProps,
    EmProps,
    TextOverflowProps {}

export const em = sys.system({
  em: {
    property: 'opacity',
    defaultScale: {
      high: 'var(--high)',
      medium: 'var(--medium)',
      low: 'var(--low)'
    }
  }
})
export const textOverflow = sys.variant({
  prop: 'textOverflow',
  variants: {
    clip: {
      overflow: 'hidden',
      textOverflow: 'clip',
      whiteSpace: 'nowrap'
    },
    ellipsis: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }
})

const getAs = ({ textStyle }: TextProps) => {
  switch (textStyle) {
    case 'h1':
    case 'h2':
    case 'h3':
      return { as: textStyle }
    case 'body1':
    case 'body2':
    case 'b1':
    case 'b2':
      return { as: 'p' }
    default:
      return { as: 'span' }
  }
}

export const Text = styled(Box).attrs(getAs)<TextProps>`
  font-family: Roboto, Helvetica Neue, arial, Noto Sans CJK JP,
    Hiragino Kaku Gothic ProN, Meiryo, sans-serif;
  ${sys.compose(
    sys.textStyle,
    em,
    textOverflow
  )};
`
Text.defaultProps = {
  textStyle: 'body1'
}

const ANKER_TAG = /\<a href=".+?"/
const replaceFn = (comment: string) => {
  const doc = new DOMParser().parseFromString(comment, 'text/html')
  const links = doc.getElementsByTagName('a')
  for (const link of links) {
    if (link.pathname === '/jump.php') {
      link.href = unescape(link.search.slice(1))
      link.referrerPolicy = 'no-referrer'
    }
  }
  return doc.body.innerHTML
}
/**
 * replace /jump.php to direct
 * @param comment HTML string
 */
export const replaceJumpLink = (comment: string) => {
  return ANKER_TAG.test(comment) ? replaceFn(comment) : comment
}
