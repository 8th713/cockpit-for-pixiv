import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { globalStyles } from '../packages/core/features/globalStyles'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'light',
        value: '#fafafa',
      },
      {
        name: 'dark',
        value: '#0b132b',
      },
    ],
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
  (Story) => {
    globalStyles()
    return (
      <QueryClientProvider client={queryClient}>
        <Story />
        <ReactQueryDevtools />
      </QueryClientProvider>
    )
  },
]

window.globalInitData = {
  token: 'token',
  userData: { id: 'self' },
}

if (typeof global.process === 'undefined') {
  const { worker } = require('../packages/core/mocks/browser')

  worker.start()
}
