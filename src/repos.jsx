import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './repos.css'
import './main.css'
import Sidebar from './components/Sidebar.jsx'

const sidebar = createRoot(document.getElementById('sidebar'))
sidebar.render(
  <StrictMode>
    <Sidebar/>
  </StrictMode>,
)