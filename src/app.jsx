import { createRoot } from 'react-dom/client';
import { ReposPage, DashboardPage, AssistantPage, NoPage } from './pages';
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

function Main() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['ready'],
    queryFn: async () => {
      const response = await fetch(
        'http://localhost:3000/start',
      )
      return await response.json()
    },
  })

  if (isPending) return (
    <div className="flex justify-center h-screen">
      <span className="loading loading-spinner loading-xl text-primary"></span>
    </div>
    
  )

  if (error) return 'An error has occurred: ' + error.message

  if (!data) return 'An error has occurred: failed to load data'

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="/repos" element={<ReposPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

const queryClient = new QueryClient()

const main = createRoot(document.getElementById('page'));
main.render(
  <div>
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  </div>
);