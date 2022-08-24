import { Avatar } from '../../shared/Avatar'
import { SkeletonText } from '../../shared/Skeleton'
import { styled } from '../../stitches.config'

export interface AuthorLinkProps {
  isLoading: boolean
  author?: Pixiv.User
}

export function AuthorLink({ isLoading, author }: AuthorLinkProps) {
  return (
    <AuthorLinkContainer href={author && `/users/${author.userId}`}>
      <Avatar src={author?.image} />
      <SkeletonText loaded={!isLoading}>
        {author?.name || '取得できませんでした'}
      </SkeletonText>
    </AuthorLinkContainer>
  )
}

const AuthorLinkContainer = styled('a', {
  baseStyle: true,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  height: '$md',
  paddingX: '$3',
  paddingY: '$1',
  borderRadius: 4,
  columnGap: '$3',
  color: '$onSurface',
  textStyle: '$h2',
  textDecorationLine: 'none',
  outlineStyle: 'none',
  '&::after': {
    content: '""',
    pointerEvents: 'none',
    boxSizing: 'inherit',
    cover: 0,
    borderRadius: 'inherit',
    backgroundColor: 'currentColor',
    opacity: 0,
    transitions: 'opacity',
  },
  '&:hover::after': {
    opacity: '$hover',
  },
  '&:focus-visible::after': {
    opacity: '$focus',
  },
})
