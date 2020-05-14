import React from 'react'
import styled from 'styled-components'
import { extend, sx, SxProps, themeRef, VariantProps } from './utils'
import { textOverflow, TextOverflowProps } from './variants'

export interface TextProps extends VariantProps<'text'>, SxProps {}

export interface LinkProps extends TextProps {
  href: string
}

export interface ParagraphProps extends TextProps, TextOverflowProps {}

export interface HTMLTextProps
  extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  children?: string
}

export const Text = styled.span<TextProps>(extend(), themeRef('text'), sx)

export const Link = styled.a<LinkProps>(
  extend({
    cursor: 'pointer',
    color: 'primary',
    textDecorationLine: 'none',
    ':focus': {
      outlineStyle: 'auto',
      outlineColor: 'currentColor'
    }
  }),
  themeRef('text'),
  sx
)

export const Heading = styled.h1<ParagraphProps>(
  extend({
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.34
  }),
  themeRef('text'),
  textOverflow,
  sx
)
Heading.defaultProps = { variant: 'h1' }

export const Paragraph = styled.p<ParagraphProps>(
  extend({
    mb: 3
  }),
  themeRef('text'),
  textOverflow,
  sx
)
Paragraph.defaultProps = {
  variant: 'body1'
}

export const HTMLText = ({ sx, children, ...props }: HTMLTextProps) => (
  <Paragraph
    variant="body2"
    {...props}
    dangerouslySetInnerHTML={{ __html: replaceJumpLink(children) }}
    sx={{
      ':empty': {
        display: 'none'
      },
      a: {
        cursor: 'pointer',
        color: 'primary',
        textDecoration: 'none',
        ':focus': {
          outline: 'auto currentColor'
        }
      },
      ...sx
    }}
  />
)

if (__DEV__) {
  Text.displayName = 'Text'
  Link.displayName = 'Link'
  Heading.displayName = 'Heading'
  Paragraph.displayName = 'Paragraph'
}

const ANKER_TAG = /<a href=".+?"/

const replaceFn = (comment: string) => {
  const doc = new DOMParser().parseFromString(comment, 'text/html')
  const links = doc.getElementsByTagName('a')
  for (const link of links) {
    if (link.pathname === '/jump.php') {
      link.href = unescape(link.search.slice(1))
      link.rel = 'noopener noreferrer'
    }
  }
  return doc.body.innerHTML
}

/**
 * replace /jump.php to direct
 * @param comment HTML string
 */
export const replaceJumpLink = (comment: string = '') => {
  return ANKER_TAG.test(comment) ? replaceFn(comment) : comment
}
