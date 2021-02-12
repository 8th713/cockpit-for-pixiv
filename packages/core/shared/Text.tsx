import { StitchesProps, styled } from '../stitches.config'

export type TitleProps = StitchesProps<typeof Title>
export type SubtitleProps = StitchesProps<typeof Subtitle>
export type ParagraphProps = StitchesProps<typeof Paragraph>
export type WordProps = StitchesProps<typeof Word>

export const Title = styled('h1', {
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  text: '$h1',
})

export const Subtitle = styled('h2', {
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  text: '$h2',
})

export const Paragraph = styled('p', {
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  text: '$body',
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
