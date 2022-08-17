import { ComponentMeta } from '@storybook/react'
import { Works } from '../../mocks/data/works'
import { Box } from '../../shared/Box'
import { styled } from '../../stitches.config'
import { App } from './App'

export default {
  title: 'Features/App',
  component: App,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof App>

export const app = () => {
  return (
    <>
      <Gallery />
      <App />
    </>
  )
}

function Gallery() {
  return (
    <Box css={{ display: 'grid', gap: '$3' }}>
      {Object.values(Works).map((info) => (
        <ThumbnailLink key={info.illustId} info={info} />
      ))}
    </Box>
  )
}

function ThumbnailLink({ info }: { info: Pixiv.IllustInfo }) {
  return (
    <Link href={`/artworks/${info.id}`}>
      <Thumbnail
        width={184}
        height={184}
        src={`https://via.placeholder.com/184.png?text=${info.id}`}
        data-src={info.urls.regular}
        alt="placeholder"
      />
      <LinkTitle>{info.title}</LinkTitle>
    </Link>
  )
}

const Link = styled('a', {
  baseStyle: true,
  display: 'block',
  width: 184,
})

const Thumbnail = styled('img', {
  baseStyle: true,
  display: 'block',
})

const LinkTitle = styled('div', {
  baseStyle: true,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})
