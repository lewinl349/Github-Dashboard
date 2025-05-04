import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sidebar from './components/Sidebar.jsx'

const sidebar = createRoot(document.getElementById('sidebar'))
sidebar.render(
  <StrictMode>
    <Sidebar />
  </StrictMode>,
)