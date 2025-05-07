import { useState } from 'react';
import logo from '../assets/logo.svg';
import githubLogo from '../assets/github-mark-white.svg';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <>
      <aside class="menu">
        <ul>
          <a href="#dashboard">
            <img src={logo} className="logo" alt="logo" />
          </a>
          <li><a href="../">&#128200; Dashboard</a></li>	
          <li><a href="/repos.html">&#128211; Repositories</a></li>
          <li><a href="#dashboard">&#128270; Assistant</a></li>
          <a href="https://github.com/lewinl349/Github-Dashboard" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} className="githubLogo" alt="Github logo"></img>
          </a>
        </ul>      
      </aside>   
    </>
  );
}