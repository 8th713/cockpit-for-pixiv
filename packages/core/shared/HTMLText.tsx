import { styled } from '../stitches.config'
import { Box } from './Box'

export interface HTMLTextProps
  extends React.ComponentPropsWithoutRef<typeof HTMLTextContainer> {
  children?: string
}

export function HTMLText({ children, ...props }: HTMLTextProps) {
  return children ? (
    <HTMLTextContainer
      {...props}
      dangerouslySetInnerHTML={{ __html: replaceJumpLink(children) }}
    />
  ) : null
}

const HTMLTextContainer = styled('p', Box, {
  wordBreak: 'break-all',
  '& a': {
    linkStyle: '$primary',
  },
})

const ANKER_TAG = /<a href=".+?"/

/**
 * replace /jump.php to direct link
 * @param comment HTML string
 */
function replaceJumpLink(comment: string = '') {
  return ANKER_TAG.test(comment) ? replaceFn(comment) : comment
}

function replaceFn(comment: string) {
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
