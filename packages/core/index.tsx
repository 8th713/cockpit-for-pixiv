import { Provider } from 'jotai'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { App } from './features/App/App'

const seconds = (s: number) => s * 1000
const minutes = (m: number) => m * seconds(60)

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

const scope = 'cockpit-for-pixiv'
const root = document.createElement('div')
root.id = scope

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <App />
    </Provider>
  </QueryClientProvider>,
  document.body.appendChild(root)
)
