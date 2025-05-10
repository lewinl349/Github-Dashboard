import { createRoot } from 'react-dom/client';
import Dashboard from './dashboard';
import Repos from './repos';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const main = createRoot(document.getElementById('page'));
main.render(
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/repos" element={<Repos />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
);