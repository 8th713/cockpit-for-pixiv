import { Avatar } from '../../shared/Avatar'
import { Box, Title } from '../../shared/Box'
import { DialogBody, DialogContent, DialogHeader } from '../../shared/Dialog'
import {
  CirclemsIcon,
  FacebookIcon,
  HomeIcon,
  InstagramIcon,
  PawooIcon,
  TumblrIcon,
  TwitterIcon,
} from '../../shared/Icons'
import { styled } from '../../stitches.config'
import { ProfileComment } from './ProfileComment'
import { ProfileDetails } from './ProfileDetails'
import { SocialLink } from './SocialLink'

export interface ProfileProps {
  user: Pixiv.User
}

export function Profile({ user }: ProfileProps) {
  return (
    <ProfileDialog>
      <ProfileHeader>
        <Avatar size="lg" src={user.imageBig} />
        <Title>{user.name}</Title>
        <Box flex>
          <SocialLink title="Web ページ" icon={HomeIcon} href={user.webpage} />
          <SocialLink
            title="Twitter"
            icon={TwitterIcon}
            href={user.social?.twitter?.url}
          />
          <SocialLink
            title="Facebook"
            icon={FacebookIcon}
            href={user.social.facebook?.url}
          />
          <SocialLink
            title="Instagram"
            icon={InstagramIcon}
            href={user.social.instagram?.url}
          />
          <SocialLink
            title="Tumblr"
            icon={TumblrIcon}
            href={user.social.tumblr?.url}
          />
          <SocialLink
            title="Circle.ms"
            icon={CirclemsIcon}
            href={user.social.circlems?.url}
          />
          <SocialLink
            title="Pawoo"
            icon={PawooIcon}
            href={user.social.pawoo?.url}
          />
        </Box>
      </ProfileHeader>
      <ProfileBody>
        <ProfileComment>{user.commentHtml}</ProfileComment>
        <ProfileDetails user={user} />
      </ProfileBody>
    </ProfileDialog>
  )
}

const ProfileDialog = styled(DialogContent, {
  minWidth: 480,
})

const ProfileHeader = styled(DialogHeader, {
  flexDirection: 'column',
  height: 'auto',
  paddingX: '$4',
  paddingTop: '$2',
  rowGap: '$2',
})

const ProfileBody = styled(DialogBody, {
  flexDirection: 'column',
  height: 'auto',
  paddingX: '$4',
  paddingTop: '$2',
  rowGap: '$2',
})
