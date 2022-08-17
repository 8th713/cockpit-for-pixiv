import { Subtitle } from '../../shared/Box'
import { BugIcon, HomeIcon, TwitterIcon } from '../../shared/Icons'
import { styled } from '../../stitches.config'

export interface LinksProps {}

export function Links({}: LinksProps) {
  return (
    <div>
      <Subtitle css={{ marginBottom: '$2' }}>Links</Subtitle>
      <LinkButton
        target="_blank"
        href="https://github.com/8th713/cockpit-for-pixiv"
      >
        <HomeIcon />
        ソースコード
      </LinkButton>
      <LinkButton
        target="_blank"
        href="https://github.com/8th713/cockpit-for-pixiv/issues"
      >
        <BugIcon />
        不具合報告
      </LinkButton>
      <LinkButton target="_blank" href="https://twitter.com/8th_713">
        <TwitterIcon />
        Twitter
      </LinkButton>
    </div>
  )
}

const LinkButton = styled('a', {
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '$md',
  marginX: '-$4',
  marginY: 0,
  paddingX: '$4',
  columnGap: '$3',
  color: '$primary',
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
