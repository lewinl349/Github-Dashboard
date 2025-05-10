import { createRoot } from 'react-dom/client';
import './repos.css'
import './app.css';
import Sidebar from './components/Sidebar.jsx';

// ================= Layout =================

export default function Dashboard() {
  return (
    <div class="main">
      <Sidebar />
      <div id="content">
        <div><h1>Github Companion Dashboard</h1></div>
        <div><p>3</p></div>
      </div>
    </div>
  );
}