import './app.css'
import Sidebar from './components/Sidebar.jsx';
import { useEffect, useState } from 'react';

// ================= Layout =================

export default function Assistant() {
  return (
    <div className="main">
      <Sidebar />
      <button className="btn btn-active btn-primary">Primary</button>
    </div>
  );
}