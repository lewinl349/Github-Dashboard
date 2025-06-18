import logo from '../assets/logo.svg';
import githubLogo from '../assets/github-mark-white.svg';
import '../app.css';
import { Outlet, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { CgPoll, CgCoffee, CgAlbum } from "react-icons/cg";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-[15vw]">
      <IconContext.Provider value={{ className: "h-5 w-5" }}>
        <ul className="menu fixed bg-base-100 h-screen">
          <li className="menu-title font-bold">Dashboard For Github</li>
          <li><Link to="/">
            <CgPoll />
            Dashboard
          </Link></li>
          <li className="menu-title">Apps</li>
          <li><Link to="/repos">
            <CgAlbum />
            Repositories</Link>
          </li>
          <li><Link to="/assistant">
            <CgCoffee />
            Assistant
            <span className="badge badge-xs badge-warning">WIP</span>
          </Link></li>
          <li className="menu-title">Links</li>
          <li>
            <a href="https://github.com/lewinl349/Github-Dashboard" target="_blank" rel="noopener noreferrer">
              <img src={githubLogo} className="h-5 w-5" alt="Github logo"></img>
              Source Code
            </a>
          </li>
        </ul>
      </IconContext.Provider>
      <Outlet />
    </div>
  );
}