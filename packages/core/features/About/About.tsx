import { memo } from 'react'
import { KEY_ASSIGNMENT } from '../../keyboardMap'
import { Box } from '../../shared/Box'
import { Dialog, DialogContent, DialogHeader } from '../../shared/Dialog'
import { Divider } from '../../shared/Divider'
import { Dl, Dt, Dd } from '../../shared/Dl'
import { BugIcon, HomeIcon, TwitterIcon } from '../../shared/Icon'
import { Subtitle, Title, Word } from '../../shared/Text'
import { duration, easing, styled } from '../../stitches.config'

export type AboutProps = {
  title: string
}

export const About = memo(({ title }: AboutProps) => (
  <Dialog>
    <DialogHeader>
      <Title>{title}</Title>
    </DialogHeader>
    <DialogContent>
      <Subtitle css={{ marginBottom: '$2' }}>Links</Subtitle>
      <Link href="https://github.com/8th713/cockpit-for-pixiv" target="_blank">
        <HomeIcon />
        ソースコード
      </Link>
      <Link
        href="https://github.com/8th713/cockpit-for-pixiv/issues"
        target="_blank"
      >
        <BugIcon />
        不具合報告
      </Link>
      <Link href="https://twitter.com/8th_713" target="_blank">
        <TwitterIcon />
        Twitter
      </Link>
      <Divider css={{ marginY: '$3' }} />
      <Subtitle css={{ marginBottom: '$2' }}>Shortcuts</Subtitle>
      <Box
        css={{
          paddingY: '$2',
          columnCount: 2,
          columnGap: '$3',
          columnRuleStyle: 'solid',
          columnRuleColor: 'rgba(255,255,255,.12)',
          columnRuleWidth: '1px',
        }}
      >
        {Object.values(KEY_ASSIGNMENT).map(
          ({ assignment, description, title }) => (
            <Dl key={assignment} css={{ justifyContent: 'space-between' }}>
              <Dt>{description}</Dt>
              <Dd>
                {(title || assignment)
                  .split('+')
                  .flatMap((key, idx) => [
                    <Word key={idx} css={{ marginX: '$2', opacity: 0.6 }}>
                      +
                    </Word>,
                    <Kbd key={key}>{key}</Kbd>,
                  ])
                  .slice(1)}
              </Dd>
            </Dl>
          )
        )}
      </Box>
    </DialogContent>
  </Dialog>
))

const Link = styled('a', {
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '$mdH',
  marginX: -24,
  marginY: 0,
  paddingX: 24,
  columnGap: '$3',
  color: '$primary',
  text: '$h2',
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
    transitionProperty: 'opacity',
    transitionDuration: duration.simple,
    transitionTimingFunction: easing.standard,
  },
  '&:hover::after': {
    opacity: 0.12,
  },
  '&:focus-visible::after': {
    opacity: 0.24,
  },
})

const Kbd = styled('kbd', {
  boxSizing: 'border-box',
  display: 'inline-block',
  minWidth: 32,
  margin: 0,
  paddingX: '$2',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$onSurface',
  borderRadius: 4,
  textAlign: 'center',
  textTransform: 'capitalize',
  fontFamily: 'mono',
})

if (__DEV__) {
  Link.displayName = 'About.Link'
  Kbd.displayName = 'About.Kbd'
}
