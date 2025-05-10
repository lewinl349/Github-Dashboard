import { useState } from 'react';
import logo from '../assets/logo.svg';
import githubLogo from '../assets/github-mark-white.svg';
import './Sidebar.css';
import { Outlet, Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div id="sidebar">
      <aside class="menu">
        <ul>
          <a href="#dashboard">
            <img src={logo} className="logo" alt="logo" />
          </a>
          <li><Link to="/">&#128200; Dashboard</Link></li>	
          <li><Link to="/repos">&#128211; Repositories</Link></li>
          <li><a href="#dashboard">&#128270; Assistant</a></li>
          <a href="https://github.com/lewinl349/Github-Dashboard" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} className="githubLogo" alt="Github logo"></img>
          </a>
        </ul>      
      </aside>
      <Outlet />   
    </div>
  );
}