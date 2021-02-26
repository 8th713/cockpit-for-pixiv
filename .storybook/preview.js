import { Provider } from 'jotai'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Box } from '../packages/core/shared/Box'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'main',
    values: [
      {
        name: 'main',
        value: '#0b132b',
      },
      {
        name: 'bg',
        value: 'rgba(11, 19, 43, 0.38)',
      },
    ],
    grid: {
      cellSize: 8,
    },
  },
  viewport: {
    viewports: {
      small: {
        name: 'small',
        styles: {
          width: '480px',
          height: '100%',
        },
      },
      large: {
        name: 'large',
        styles: {
          width: '1024px',
          height: '100%',
        },
      },
    },
  },
}

const seconds = (s) => s * 1000
const minutes = (m) => m * seconds(60)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: minutes(5),
      cacheTime: minutes(1),
    },
  },
})

export const decorators = [
  (Story) => (
    <Box
      css={{
        display: 'contents',
        color: '$onSurface',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Story />
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Box>
  ),
]

window.globalInitData = {
  token: 'token',
  userData: { id: 'self' },
}

if (typeof global.process === 'undefined') {
  const { worker } = require('../packages/core/mocks/browser')

  worker.start()
}
