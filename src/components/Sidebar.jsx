import { useState } from 'react';
import logo from '../assets/logo.svg';
import githubLogo from '../assets/github-mark-white.svg';
import '../app.css';
import { Outlet, Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen bg-base-100 w-45 ">
      <ul className="menu">
        <li><Link to="/">
          &#128200; Dashboard
          <span className="badge badge-xs">Read</span>
        </Link></li>
        <li><Link to="/repos">&#128211; Repositories</Link></li>
        <li><Link to="/assistant">
          &#128270; Assistant
          <span className="badge badge-xs badge-warning">WIP</span>
        </Link></li>
      </ul>
      {/* <a href="https://github.com/lewinl349/Github-Dashboard" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} className="w-12" alt="Github logo"></img>
      </a> */}
      <Outlet />
    </div>
  );
}