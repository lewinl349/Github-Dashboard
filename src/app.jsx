import { createRoot } from 'react-dom/client';
import Dashboard from './dashboard';
import Repos from './repos';
import Assistant from './assistant';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { fetchListOfRepos } from "./hooks/fetch_github";

const main = createRoot(document.getElementById('page'));
main.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/repos" element={<Repos />} />
        <Route path="/assistant" element={<Assistant />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  </div>
);