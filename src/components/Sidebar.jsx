import logo from '../assets/logo.svg';
import githubLogo from '../assets/github-mark-white.svg';
import '../app.css';
import { Outlet, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { CgPoll, CgCoffee, CgAlbum, CgGhost } from "react-icons/cg";
import { useQuery } from '@tanstack/react-query';

export default function Sidebar() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['userdata'],
    queryFn: async () => {
      const response = await fetch(
        'http://localhost:3000/user/data',
      )
      return await response.json()
    },
  })

  if (isPending) return (<span className="loading loading-spinner text-primary"></span>)

  if (error) return 'An error has occurred: ' + error.message

  return (
    <IconContext.Provider value={{ className: "h-5 w-5" }}>
      <div class="drawer lg:drawer-open w-[12vw]">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center justify-center">
          <label for="my-drawer-2" class="btn btn-primary fixed left-0 bottom-0 drawer-button lg:hidden">
            <CgGhost />
          </label>
        </div>
        <div class="drawer-side">
          <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
          <ul className="menu bg-base-100 h-screen border-r border-gray-400 justify-between w-[12vw]">
            <div className="overflow-hidden w-full">
              <li className="menu-title font-bold truncate">Dashboard For Github</li>
              <li className="truncate"><Link to="/">
                <CgPoll />
                Dashboard
              </Link></li>
              <li className="menu-title truncate">Apps</li>
              <li className="truncate"><Link to="/repos">
                <CgAlbum />
                Repositories</Link>
              </li>
              <li className="truncate"><Link to="/assistant">
                <CgCoffee />
                Assistant
                <span className="badge badge-xs badge-warning">WIP</span>
              </Link></li>
              <li className="menu-title truncate">Links</li>
              <li>
                <a href="https://github.com/lewinl349/Github-Dashboard" target="_blank" rel="noopener noreferrer">
                  <img src={githubLogo} className="h-5 w-5" alt="Github logo"></img>
                  Source Code
                </a>
              </li>
            </div>
            <div className="p-4 border-t border-gray-300 flex gap-3 w-full">
              <img
                src={data.pfp}
                alt="Profile Picture"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="font-bold truncate">{data.name}</span>
                <span className="text-sm hover:underline hover:bold hover:text-red-300">Logout</span>
              </div>
            </div>
          </ul>
          <Outlet />
        </div>
      </div>
    </IconContext.Provider>
  );
}