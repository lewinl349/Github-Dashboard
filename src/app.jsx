import { createRoot } from 'react-dom/client';
import { ReposPage, DashboardPage } from './query';
import Assistant from './assistant';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const main = createRoot(document.getElementById('page'));
main.render(
  <div>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="/repos" element={<ReposPage />} />
          <Route path="/assistant" element={<Assistant />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </div>
);