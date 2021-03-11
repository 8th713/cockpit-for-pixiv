import { Meta } from '@storybook/react'
import { Box, BoxProps, Flex, Grid } from './Box'

export default {
  title: 'Shared/Box',
  component: Box,
} as Meta<BoxProps>

export const BoxExample = () => (
  <Box
    css={{
      size: 256,
      backgroundColor: '$primary',
      color: '$onPrimary',
    }}
  >
    Box
  </Box>
)
BoxExample.storyName = 'Box'

export const FlexExample = () => (
  <Flex>
    <Box
      css={{
        flexGrow: 1,
        backgroundColor: '$primary',
        color: '$onPrimary',
      }}
    >
      Box 1
    </Box>
    <Box
      css={{
        flexGrow: 1,
        backgroundColor: '$secondary',
        color: '$onSecondary',
      }}
    >
      Box 2
    </Box>
  </Flex>
)
FlexExample.storyName = 'Flex'

export const GridExample = () => (
  <Grid
    css={{
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: '$2',
    }}
  >
    <Box
      css={{
        backgroundColor: '$primary',
        color: '$onPrimary',
      }}
    >
      Box 1
    </Box>
    <Box
      css={{
        backgroundColor: '$secondary',
        color: '$onSecondary',
      }}
    >
      Box 2
    </Box>
    <Box
      css={{
        backgroundColor: '$secondary',
        color: '$onSecondary',
      }}
    >
      Box 3
    </Box>
    <Box
      css={{
        backgroundColor: '$primary',
        color: '$onPrimary',
      }}
    >
      Box 4
    </Box>
  </Grid>
)
GridExample.storyName = 'Grid'

export const WithTypoVariant = () => <Box typo="h1">Box</Box>
