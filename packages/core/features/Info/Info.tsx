import { Box, Flex } from '../../shared/Box'
import { Divider } from '../../shared/Divider'
import { Author } from './Author/Author'
import { Caption } from './Caption/Caption'
import { Description } from './Description/Description'
import { useIllustQuery } from './illustQuery'
import { useBottomAnchor } from './infoState'
import { RecentIllustList } from './RecentIllustList/RecentIllustList'

export type InfoProps = {
  id: string
}

export function Info({ id }: InfoProps) {
  const ref = useBottomAnchor()
  const props = useIllustQuery(id)

  return (
    <>
      <Box ref={ref as any} data-name="cfp-bottom-anchor" />
      <Box css={{ position: 'sticky', top: 0, bottom: 0, zIndex: 1 }}>
        <Caption id={id} {...props} />
      </Box>
      <Box css={{ backgroundColor: '$surface' }}>
        <Divider css={{ position: 'sticky', top: 56, marginX: '$3' }} />
        <Flex
          css={{
            flexDirection: 'column',
          }}
        >
          <Flex css={{ padding: '$3', columnGap: '$2' }}>
            <Box css={{ flexGrow: 1 }}>
              <Description id={id} {...props} />
            </Box>
            <Divider />
            <Box
              css={{
                position: 'sticky',
                top: 72,
                alignSelf: 'start',
                flexShrink: 0,
                width: 256,
              }}
            >
              <Author illustId={id} />
            </Box>
          </Flex>
          <Divider css={{ marginX: '$3' }} />
          <RecentIllustList id={id} />
        </Flex>
      </Box>
    </>
  )
}
