import React from 'react'
import { Avatar } from '../../../shared/Avatar'
import { Box, Flex } from '../../../shared/Box'
import { Dialog, DialogContent, DialogHeader } from '../../../shared/Dialog'
import { Divider } from '../../../shared/Divider'
import { Dd, Dl, Dt } from '../../../shared/Dl'
import {
  CirclemsIcon,
  FacebookIcon,
  HomeIcon,
  InstagramIcon,
  PawooIcon,
  TumblrIcon,
  TwitterIcon,
} from '../../../shared/Icon'
import { IconLink } from '../../../shared/IconButton'
import { Title } from '../../../shared/Text'
import { HTMLText } from '../../../shared/HTMLText'

export type ProfileProps = Pixiv.User & {}

type DetailListItemProps = Pixiv.Appanage & {
  label: string
}

export const Profile = ({
  imageBig,
  name,
  webpage,
  social,
  commentHtml,
  gender,
  region,
  birthDay,
  job,
}: ProfileProps) => (
  <Dialog css={{ minWidth: 480 }}>
    <DialogHeader
      css={{
        flexDirection: 'column',
        height: 'auto',
        paddingX: 24,
        paddingTop: '$2',
        rowGap: '$2',
      }}
    >
      <Avatar size={128} src={imageBig} />
      <Title>{name}</Title>
      <Flex>
        {webpage && (
          <IconLink
            target="_blank"
            rel="noopener noreferrer"
            href={webpage}
            title="Web ページ"
          >
            <HomeIcon />
          </IconLink>
        )}
        {social.twitter && (
          <IconLink
            target="_blank"
            rel="noopener noreferrer"
            href={social.twitter.url}
            title="Twitter"
          >
            <TwitterIcon />
          </IconLink>
        )}
        {social.facebook && (
          <IconLink
            target="_blank"
            rel="noopener noreferrer"
            href={social.facebook.url}
            title="Facebook"
          >
            <FacebookIcon />
          </IconLink>
        )}
        {social.instagram && (
          <IconLink
            target="_blank"
            rel="noopener noreferrer"
            href={social.instagram.url}
            title="Instagram"
          >
            <InstagramIcon />
          </IconLink>
        )}
        {social.tumblr && (
          <IconLink
            target="_blank"
            rel="noopener noreferrer"
            href={social.tumblr.url}
            title="Tumblr"
          >
            <TumblrIcon />
          </IconLink>
        )}
        {social.circlems && (
          <IconLink
            target="_blank"
            rel="noopener noreferrer"
            href={social.circlems.url}
            title="Circle.ms"
          >
            <CirclemsIcon />
          </IconLink>
        )}
        {social.pawoo && (
          <IconLink
            target="_blank"
            rel="noopener noreferrer"
            href={social.pawoo.url}
            title="Pawoo"
          >
            <PawooIcon />
          </IconLink>
        )}
      </Flex>
    </DialogHeader>
    <DialogContent
      css={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '$3',
      }}
    >
      <Divider />
      {commentHtml && (
        <>
          <HTMLText>{commentHtml}</HTMLText>
          <Divider />
        </>
      )}
      <Box
        css={{
          columnCount: 2,
          gap: '$3',
          columnRuleStyle: 'solid',
          columnRuleColor: 'rgba(255,255,255,.12)',
          columnRuleWidth: '1px',
          ':empty': {
            display: 'none',
          },
        }}
      >
        <DetailListItem label="性別" {...gender} />
        <DetailListItem label="居住地" {...region} />
        <DetailListItem label="誕生日" {...birthDay} />
        <DetailListItem label="職業" {...job} />
      </Box>
    </DialogContent>
  </Dialog>
)

const DetailListItem = ({ privacyLevel, label, name }: DetailListItemProps) =>
  privacyLevel === '0' ? (
    <Dl>
      <Dt css={{ width: '50%' }}>{label}</Dt>
      <Dd css={{ width: '50%' }}>{name}</Dd>
    </Dl>
  ) : null
