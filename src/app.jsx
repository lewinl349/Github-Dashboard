import { createRoot } from 'react-dom/client';
import { ReposPage, EditRepoPage, DashboardPage, AssistantPage, NoPage } from './pages';
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { LoginPage } from './components/login';
import { ReadyProvider, useReady } from "./scripts/loginContextHelper.jsx";

function Main() {
  const { ready } = useReady();

  if (ready) {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="repos">
              <Route index element={<ReposPage />} />
              <Route path="edit/:owner/r/:name" element={<EditRepoPage />} />
          </Route>
          <Route path="assistant" element={<AssistantPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    )
  }
  else {
    return (<LoginPage />)
  }
}

const queryClient = new QueryClient()

const main = createRoot(document.getElementById('page'));
main.render(
  <div>
    <QueryClientProvider client={queryClient}>
      <ReadyProvider>
        <Main />
      </ReadyProvider>
    </QueryClientProvider>
  </div>
);