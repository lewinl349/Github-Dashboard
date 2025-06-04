import { createRoot } from 'react-dom/client';
import { ReposPage, DashboardPage, AssistantPage, NoPage } from './query';
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const main = createRoot(document.getElementById('page'));
main.render(
  <div>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="/repos" element={<ReposPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </div>
);