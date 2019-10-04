import css from '@styled-system/css'
import React, { memo } from 'react'
import styled from 'styled-components'
import {
  Box,
  BugIcon,
  createTransition,
  Dialog,
  Divider,
  Dl,
  extend,
  Heading,
  HomeIcon,
  Link,
  SxProps,
  Text,
  themeGet
} from '../../components'
import { KEY_ASSIGNMENT, LABEL } from '../../constants'

interface LinkItemProps {
  children?: React.ReactNode
  href: string
  icon: React.ComponentType<SxProps>
}

interface KeyItemProps {
  children?: React.ReactNode
  keyName: string
  title?: string
}

export const AboutDialog = memo(() => (
  <Dialog>
    <Dialog.Header>
      <Heading>{LABEL}</Heading>
    </Dialog.Header>
    <Dialog.Content sx={{ p: 0 }}>
      <Box as="section" sx={{ mb: 2 }}>
        <Subheader>About</Subheader>
        <LinkItem href={GM_info.script.homepage} icon={HomeIcon}>
          View the Github Project
        </LinkItem>
        <LinkItem href={GM_info.script.supportURL} icon={BugIcon}>
          Report Issues
        </LinkItem>
      </Box>
      <Divider sx={{ mx: 24 }} />
      <Box as="section" sx={{ mb: 2 }}>
        <Subheader>Shortcuts</Subheader>
        <Box
          sx={{
            columnCount: 2,
            gap: 4,
            columnRuleStyle: 'solid',
            columnRuleColor: 'rgba(255,255,255,.12)',
            columnRuleWidth: 1,
            px: 24
          }}
        >
          {Object.values(KEY_ASSIGNMENT).map(props => (
            <KeyItem key={props.keyName} {...props} />
          ))}
        </Box>
      </Box>
    </Dialog.Content>
  </Dialog>
))

const LinkItem = ({ children, href, icon: Icon }: LinkItemProps) => (
  <Link
    href={href}
    sx={{
      outlineWidth: 0,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      height: 56,
      px: 24,
      textDecoration: 'none',
      variant: 'text.body1',
      '::after': {
        content: '""',
        pointerEvents: 'none',
        boxSizing: 'inherit',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        bg: 'currentColor',
        opacity: 0,
        transition: createTransition('opacity')
      },
      '&:hover::after': {
        opacity: themeGet('opacities.hover')
      },
      '&:focus::after': {
        opacity: themeGet('opacities.focus')
      }
    }}
  >
    <Icon sx={{ mr: 3 }} />
    {children}
  </Link>
)

const KeyItem = ({ children, keyName, title }: KeyItemProps) => (
  <Dl sx={{ justifyContent: 'space-between' }}>
    <Dl.Dt>{children}</Dl.Dt>
    <Dl.Dd>
      {(title || keyName)
        .split('+')
        .flatMap((key, idx) => [
          <Text
            key={idx}
            sx={{ mx: 2, opacity: themeGet('opacities.inactive') }}
          >
            +
          </Text>,
          <Kbd key={key}>{key}</Kbd>
        ])
        .slice(1)}
    </Dl.Dd>
  </Dl>
)

const Subheader = styled(Heading)(
  css({
    display: 'flex',
    alignItems: 'center',
    height: 48,
    mx: 24
  })
)
Subheader.defaultProps = {
  variant: 'h3'
}

const Kbd = styled.kbd(
  extend({
    display: 'inline-block',
    minWidth: 32,
    px: 2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'onSurface',
    borderRadius: 4,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'mono'
  })
)

if (__DEV__) {
  AboutDialog.displayName = 'AboutDialog'
  LinkItem.dispalyName = 'AboutDialog.LinkItem'
  KeyItem.displayName = 'AboutDialog.KeyItem'
  Subheader.displayName = 'AboutDialog.Subheader'
  Kbd.displayName = 'AboutDialog.Kbd'
}
