import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Box,
  Dialog,
  FacebookIcon,
  HomeIcon,
  Hotkey,
  InstagramIcon,
  Link,
  Modal,
  replaceJumpLink,
  Text,
  TumblrIcon,
  TwitterIcon
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'

export const Profile = (user: Pixiv.User) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const { social } = user
  const comment = replaceJumpLink(user.commentHtml)

  return (
    <>
      <Link as="button" ml={3} textStyle="b2" onClick={() => setOpen(true)}>
        プロフィール
      </Link>
      <Modal open={open} onClose={handleClose}>
        <Dialog onBackdropClick={handleClose}>
          <Dialog.Header>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              flexGrow={1}
              minWidth={256}
            >
              <Avatar src={user.imageBig} />
              <Text textStyle="h2" mt={2}>
                {user.name}
              </Text>
            </Box>
          </Dialog.Header>
          <Dialog.Divider />
          <Dialog.Content style={{ padding: 0 }}>
            <Box display="flex" alignItems="center" px={24} py={2}>
              {user.webpage && (
                <IconLink textStyle="b2" target="_blank" href={user.webpage}>
                  <HomeIcon />
                </IconLink>
              )}
              {social.twitter && (
                <IconLink
                  textStyle="b2"
                  target="_blank"
                  href={social.twitter.url}
                >
                  <TwitterIcon />
                </IconLink>
              )}
              {social.facebook && (
                <IconLink
                  textStyle="b2"
                  target="_blank"
                  href={social.facebook.url}
                >
                  <FacebookIcon />
                </IconLink>
              )}
              {social.instagram && (
                <IconLink
                  textStyle="b2"
                  target="_blank"
                  href={social.instagram.url}
                >
                  <InstagramIcon />
                </IconLink>
              )}
              {social.tumblr && (
                <IconLink
                  textStyle="b2"
                  target="_blank"
                  href={social.tumblr.url}
                >
                  <TumblrIcon />
                </IconLink>
              )}
              {social.circlems && (
                <IconLink
                  textStyle="b2"
                  target="_blank"
                  href={social.circlems.url}
                >
                  Circle.ms
                </IconLink>
              )}
              {social.pawoo && (
                <IconLink
                  textStyle="b2"
                  target="_blank"
                  href={social.pawoo.url}
                >
                  Pawoo
                </IconLink>
              )}
            </Box>
            <Comment
              textStyle="b2"
              px={24}
              py={2}
              dangerouslySetInnerHTML={{ __html: comment }}
            />
            <Dialog.Divider height={1} />
            {user.gender.privacyLevel === '0' && (
              <Line>
                <LineHead textStyle="b2">性別</LineHead>
                <Text textStyle="b2">{user.gender.name}</Text>
              </Line>
            )}
            {user.region.privacyLevel === '0' && (
              <Line>
                <LineHead textStyle="b2">居住地</LineHead>
                <Text textStyle="b2">{user.region.name}</Text>
              </Line>
            )}
            {user.birthDay.privacyLevel === '0' && (
              <Line>
                <LineHead textStyle="b2">誕生日</LineHead>
                <Text textStyle="b2">{user.birthDay.name}</Text>
              </Line>
            )}
            {user.job.privacyLevel === '0' && (
              <Line>
                <LineHead textStyle="b2">職業</LineHead>
                <Text textStyle="b2">{user.job.name}</Text>
              </Line>
            )}
          </Dialog.Content>
        </Dialog>
      </Modal>
      <Hotkey {...KEY_ASSIGNMENT.profile} action={() => setOpen(v => !v)} />
    </>
  )
}

const Avatar = styled.img`
  all: unset;
  user-select: none;
  object-fit: cover;
  width: 80px;
  height: 80px;
  background-color: var(--surface);
  border-radius: 50%;
`
const IconLink = styled(Link)`
  display: inline-flex;
  & + & {
    margin-left: 8px;
  }
`
const Line = styled(Box)`
  display: flex;
  margin: 8px 24px;
  align-items: center;
`
const LineHead = styled(Text)`
  width: 30%;
`
const Comment = styled(Text)`
  word-break: break-word;
  a {
    cursor: pointer;
    color: var(--primary);
    :hover {
      text-decoration: none;
    }
    :focus {
      outline: auto currentColor;
    }
  }
`
