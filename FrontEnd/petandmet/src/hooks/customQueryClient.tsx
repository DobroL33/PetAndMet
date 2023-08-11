import { QueryClient } from 'react-query'

const domain = 'https://i9b302.p.ssafy.io/api/v1'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
    mutations: {},
  },
})
export { domain, queryClient }
