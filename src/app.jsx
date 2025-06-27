import { createRoot } from 'react-dom/client';
import { ReposPage, DashboardPage, AssistantPage, NoPage } from './pages';
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { useState, useEffect } from 'react';
import { LoginPage } from './components/login';

function Main() {
  const [ready, setReady] = useState(false);

  if (ready) {
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
  else {
    return (<LoginPage setReady={setReady}/>)
  }
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