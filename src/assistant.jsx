import './app.css'
import './assistant.css';
import Sidebar from './components/Sidebar.jsx';
import { useEffect, useState } from 'react';

// ================= Layout =================

export default function Assistant() {
  return (
    <div className="main">
      <Sidebar />
    </div>
  );
}