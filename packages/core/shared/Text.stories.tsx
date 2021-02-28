import { Meta, Story } from '@storybook/react'
import {
  Link,
  LinkProps,
  Paragraph,
  ParagraphProps,
  Subtitle,
  SubtitleProps,
  Title,
  TitleProps,
  Word,
  WordProps,
} from './Text'

export default {
  title: 'Shared/Text',
  component: Title,
} as Meta

export const T: Story<TitleProps> = () => <Title>テキスト Text</Title>
T.storyName = 'Title'

export const S: Story<SubtitleProps> = () => <Subtitle>テキスト Text</Subtitle>
S.storyName = 'Subtitle'

export const P: Story<ParagraphProps> = () => (
  <Paragraph>テキスト Text</Paragraph>
)
P.storyName = 'Paragraph'

export const W: Story<WordProps> = () => <Word>テキスト Text</Word>
W.storyName = 'Word'

export const L: Story<LinkProps> = () => <Link href="#">テキスト Text</Link>
L.storyName = 'Link'

export const LongText = () => (
  <Paragraph>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero corrupti
    aspernatur voluptate expedita esse accusantium provident rerum quisquam
    deleniti cum dolorum fuga saepe, doloribus consequuntur cupiditate
    laboriosam suscipit? Ducimus, sit.
  </Paragraph>
)

export const LongTextEllipsis = () => (
  <Paragraph noWrap>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero corrupti
    aspernatur voluptate expedita esse accusantium provident rerum quisquam
    deleniti cum dolorum fuga saepe, doloribus consequuntur cupiditate
    laboriosam suscipit? Ducimus, sit.
  </Paragraph>
)
