import css from '@styled-system/css'
import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Avatar,
  Box,
  CirclemsIcon,
  Dialog,
  Divider,
  Dl,
  FacebookIcon,
  Flex,
  getHotkeyHint,
  Heading,
  HomeIcon,
  Hotkey,
  HTMLText,
  IconButton,
  InstagramIcon,
  Modal,
  PawooIcon,
  ProfileIcon,
  TumblrIcon,
  TwitterIcon
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'

interface DetailListItemProps extends Pixiv.Appanage {
  label: string
}

const title = getHotkeyHint(KEY_ASSIGNMENT.profile)

export const Profile = (props: Pixiv.User) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const { social } = props

  return (
    <>
      <IconButton title={title} onClick={() => setOpen(true)}>
        <ProfileIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
        <Dialog sx={{ minWidth: 720 }}>
          <Dialog.Header
            sx={{
              flexDirection: 'column',
              height: 'auto',
              pt: 3
            }}
          >
            <Avatar size={128} src={props.imageBig} />
            <Heading sx={{ mt: 2 }}>{props.name}</Heading>
            <LinkContainer>
              {props.webpage && (
                <IconLink href={props.webpage} title="Web ページ">
                  <HomeIcon />
                </IconLink>
              )}
              {social.twitter && (
                <IconLink href={social.twitter.url} title="Twitter">
                  <TwitterIcon />
                </IconLink>
              )}
              {social.facebook && (
                <IconLink href={social.facebook.url} title="Facebook">
                  <FacebookIcon />
                </IconLink>
              )}
              {social.instagram && (
                <IconLink href={social.instagram.url} title="Instagram">
                  <InstagramIcon />
                </IconLink>
              )}
              {social.tumblr && (
                <IconLink href={social.tumblr.url} title="Tumblr">
                  <TumblrIcon />
                </IconLink>
              )}
              {social.circlems && (
                <IconLink href={social.circlems.url} title="Circle.ms">
                  <CirclemsIcon />
                </IconLink>
              )}
              {social.pawoo && (
                <IconLink href={social.pawoo.url} title="Pawoo">
                  <PawooIcon />
                </IconLink>
              )}
            </LinkContainer>
          </Dialog.Header>
          <Divider />
          <Dialog.Content>
            {props.commentHtml && (
              <>
                <HTMLText>{props.commentHtml}</HTMLText>
                <Divider />
              </>
            )}
            <DetailList>
              <DetailListItem label="性別" {...props.gender} />
              <DetailListItem label="居住地" {...props.region} />
              <DetailListItem label="誕生日" {...props.birthDay} />
              <DetailListItem label="職業" {...props.job} />
            </DetailList>
          </Dialog.Content>
        </Dialog>
      </Modal>
      <Hotkey {...KEY_ASSIGNMENT.profile} action={() => setOpen(v => !v)} />
    </>
  )
}

const LinkContainer = styled(Flex)(
  css({
    justifyContent: 'center',
    m: 2,
    ':empty': {
      display: 'none'
    }
  })
)

const IconLink = styled(IconButton.Link)({})
IconLink.defaultProps = {
  target: '_blank',
  rel: 'noopener referer'
}

const DetailList = styled(Box)(
  css({
    columnCount: 2,
    gap: 4,
    columnRuleStyle: 'solid',
    columnRuleColor: 'rgba(255,255,255,.12)',
    columnRuleWidth: 1,
    mt: 3,
    ':empty': {
      display: 'none'
    }
  })
)

const DetailListItem = ({ privacyLevel, label, name }: DetailListItemProps) =>
  privacyLevel === '0' ? (
    <Dl>
      <Dl.Dt sx={{ width: '50%' }}>{label}</Dl.Dt>
      <Dl.Dd>{name}</Dl.Dd>
    </Dl>
  ) : null

if (__DEV__) {
  LinkContainer.displayName = 'Profile.LinkContainer'
  IconLink.displayName = 'Profile.IconLink'
  DetailList.displayName = 'Profile.DetailList'
  DetailListItem.displayName = 'Profile.DetailListItem'
}
