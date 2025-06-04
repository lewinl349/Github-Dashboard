import '../app.css'
import Sidebar from '../components/Sidebar.jsx';
import { useEffect, useState } from 'react';

// ================= Layout =================

export default function Assistant() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">The AI assistant is a work in progress!</h1>
            <p className="py-6">
              Planned features: Looking at your repositories and local changes, it can
              generate git commands and custom commit messages.
              (This may change in the future)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}