import { Paragraph } from './Text'

export type HTMLTextProps = { children?: string }

export const HTMLText = ({ children }: HTMLTextProps) =>
  children ? (
    <Paragraph
      css={{
        wordBreak: 'break-all',
        a: {
          cursor: 'pointer',
          color: '$primary',
          textDecoration: 'none',
          '&:focus': {
            outlineOffset: -1,
            outlineWidth: 1,
            outlineStyle: 'dotted',
            outlineColor: 'currentcolor',
          },
        },
      }}
      dangerouslySetInnerHTML={{ __html: replaceJumpLink(children) }}
    />
  ) : null

const ANKER_TAG = /<a href=".+?"/

/**
 * replace /jump.php to direct link
 * @param comment HTML string
 */
const replaceJumpLink = (comment: string = '') =>
  ANKER_TAG.test(comment) ? replaceFn(comment) : comment

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
