import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { globalStyles } from '../packages/core/features/App/globalStyles'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'Dark',
    values: [
      {
        name: 'Light',
        value: '#fafafa',
      },
      {
        name: 'Dark',
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
