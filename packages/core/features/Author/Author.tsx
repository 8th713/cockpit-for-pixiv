import { Box } from '../../shared/Box'
import { HomeIcon, TwitterIcon } from '../../shared/Icons'
import { styled } from '../../stitches.config'
import { AuthorLink } from './AuthorLink'
import { useStickyAuthor } from './authorQuery'
import { AuthorRefetchButton } from './AuthorRefetchButton'
import { FollowButton } from './FollowButton'
import { GalleryLink } from './GalleryLink'
import { ProfileButton } from './ProfileButton'
import { SocialLink } from './SocialLink'

export interface AuthorProps {
  illustId: string
}

export function Author({ illustId }: AuthorProps) {
  const {
    info,
    author,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useStickyAuthor(illustId)

  return (
    <Container>
      <AuthorLink isLoading={isLoading} author={author} />
      <Box flex>
        <AuthorRefetchButton
          isError={isError}
          isFetching={isFetching}
          refetch={refetch}
        />
        <FollowButton info={info} author={author} />
        <ProfileButton key={author?.userId} user={author} />
        <GalleryLink userId={author?.userId} />
        <SocialLink title="Web ページ" icon={HomeIcon} href={author?.webpage} />
        <SocialLink
          title="Twitter"
          icon={TwitterIcon}
          href={author?.social?.twitter?.url}
        />
      </Box>
    </Container>
  )
}

const Container = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  backgroundColor: '$surface',
  color: '$onSurface',
})
