import { styled } from '../stitches.config'
import { typography } from './typography'

export type TitleProps = React.ComponentProps<typeof Title>
export type SubtitleProps = React.ComponentProps<typeof Subtitle>
export type ParagraphProps = React.ComponentProps<typeof Paragraph>
export type WordProps = React.ComponentProps<typeof Word>
export type LinkProps = React.ComponentProps<typeof Link>

const noWrapVariant = {
  true: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
} as const

export const Title = styled('h1', {
  '--label': 'title',
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  variants: {
    typo: typography,
    noWrap: noWrapVariant,
  },
  defaultVariants: {
    typo: 'h1',
  },
})

export const Subtitle = styled('h2', {
  '--label': 'subtitle',
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  variants: {
    typo: typography,
    noWrap: noWrapVariant,
  },
  defaultVariants: {
    typo: 'h2',
  },
})

export const Paragraph = styled('p', {
  '--label': 'paragraph',
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  variants: {
    typo: typography,
    noWrap: noWrapVariant,
  },
  defaultVariants: {
    typo: 'body',
  },
})

export const Word = styled('span', {
  boxSizing: 'border-box',
})

export const Link = styled('a', {
  cursor: 'pointer',
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  color: '$primary',
  textDecorationLine: 'none',
  '&:focus': {
    outlineOffset: -1,
    outlineWidth: 1,
    outlineStyle: 'dotted',
    outlineColor: 'currentColor',
  },
})

if (__DEV__) {
  Title.displayName = 'Title'
  Subtitle.displayName = 'Subtitle'
  Paragraph.displayName = 'Paragraph'
  Word.displayName = 'Word'
  Link.displayName = 'Link'
}
