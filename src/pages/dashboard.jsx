import '../app.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { customUseQuery } from '../hooks/queryHelper.jsx';
import { useQuery } from '@tanstack/react-query';
import { IconContext } from "react-icons";
import { CgFlagAlt } from "react-icons/cg";
import { GoFileCode, GoFlame, GoGitPullRequest, GoStar } from "react-icons/go";
import { options, generateLangDataBar, generateLangDataPie } from '../scripts/chartJSHelper.jsx'

// ================= Graphs =================
// Languages chart
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// ================= COMPONENTS =================

function StatBox({ title, stat, children }) {
  return (
    <div className="w-55 bg-base-100 rounded-box p-5 border border-gray-400 flex">
      {children}
      <div>
        <h1 className="text-m">{title}</h1>
        <p className="text-4xl font-bold">{stat}</p>
      </div>
    </div>
  )
}

function WelcomeBanner() {
  const { isPending, error, data } = customUseQuery("N/A", "/api/user", "userdata");

  if (isPending) return (<span className="loading loading-spinner text-primary"></span>);
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <IconContext.Provider value={{ className: "h-8 w-8 mr-2" }}>
      <div className="col-span-5 flex py-10 bg-base-100 border border-gray-400">
        <img src={data.pfp}
          className="mx-5 w-20 h-20"></img>
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {data.nickname || data.name}!</h1>
          <p className="pt-4">
            Here's your summary for today:
          </p>
        </div>
      </div>
      <StatBox title={"# of Repos"} stat={data.num_of_repos} children={<GoFileCode />} />
      <StatBox title={"Commits (Past Year)"} stat={data.num_of_comm} children={<GoFlame />} />
      <StatBox title={"Pull Req. (Past Year)"} stat={data.num_of_pull} children={<GoGitPullRequest />} />
      <StatBox title={"Issues (Past Year)"} stat={data.num_of_issue} children={<CgFlagAlt />} />
      <StatBox title={"Stars"} stat={data.num_of_stars} children={<GoStar />} />
    </IconContext.Provider>

  )
}

function GraphsCaro() {
  const { isPending, error, data } = customUseQuery("N/A", "/api/repos/languages", "langData");

  if (isPending) return (<span className="loading loading-spinner text-primary"></span>);
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="carousel rounded-box w-150 my-5">
      <div id="item1" className="carousel-item w-full">
        <div className="card shadow-sm w-150">
          <figure>
            <Pie data={generateLangDataPie(data)} options={options} />
          </figure>
          <div className="card-body">
            <h2 className="text-center font-bold text-2xl">Most Used Languages</h2>
            <p className="text-center">Pie Chart | File Size in Bytes | Data from repos owned by others aren't counted</p>
          </div>
        </div>
      </div>
      <div id="item2" className="carousel-item w-full">
        <div className="card bg-base-100 w-150 shadow-sm">
          <figure>
            <Bar data={generateLangDataBar(data)} options={options} />
          </figure>
          <div className="card-body">
            <h2 className="text-center font-bold text-2xl">Most Used Languages</h2>
            <p className="text-center">Bar Graph | File Size in Bytes</p>
          </div>
        </div>
      </div>
      <div id="item3" className="carousel-item w-full">
        <div className="card bg-base-100 w-150 shadow-sm">
          <figure>
            <Doughnut data={generateLangDataPie(data)} options={options} />
          </figure>
          <div className="card-body">
            <h2 className="text-center font-bold text-2xl">Most Used Languages</h2>
            <p className="text-center">Doughnut Chart | File Size in Bytes</p>
          </div>
        </div>
      </div>
      <div id="item4" className="carousel-item w-full">
        <div className="card bg-base-100 w-150 shadow-sm">
          <div className="card-body">
            <h2 className="text-center font-bold text-2xl">More coming soon!</h2>
            <p className="text-center"></p>
          </div>
        </div>
      </div>
    </div>
  )
}

function DueSoonPanel() {
  const { isPending, error, data } = customUseQuery("N/A", "/db/TODO/due_soon", "dueSoon");

  if (isPending) return (<span className="loading loading-spinner text-primary"></span>);
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="col-span-2 row-span-3 list-row bg-base-100 p-5 rounded-box border border-gray-400">
      <div className="text-xl font-bold my-2">Upcoming</div>
      <ul className="list bg-base-100 rounded-box max-h-[40vh] max-w-[420px] overflow-scroll">
        {data instanceof Array && data.length > 0 ? data.map((entry) => !entry.completed && (
          <li key={`${entry.id}`} className="list-row hover:bg-base-300 group flex justify-between">
            <div>
              <div className="font-bold">{entry.description}</div>
              <div>{`${entry.repo_owner}/${entry.repo_name}`}</div>
              <div className="text-gray-500">{`Due: ${entry.due_date.split('T')[0]}`}</div>
              <div className="badge badge-outline badge-primary badge-xs">{entry.label}</div>  
            </div>
          </li>
        ))
        : (<div className="list-row hover:bg-base-300 group">No items...</div>)}
      </ul>
    </div>
  )
}

// ================= LAYOUT =================

export default function Dashboard() {
  return (
    <div className="grid grid-flow-col md:grid-flow-row gap-5 m-5">
      <WelcomeBanner />
      <div className="row-start-3 col-span-3 row-span-3 flex flex-col bg-base-100 p-5 items-center border border-gray-400">
        <GraphsCaro />
        <div className="flex w-full justify-center gap-2 py-2">
          <a href="#item1" className="btn btn-outline btn-primary btn-circle">1</a>
          <a href="#item2" className="btn btn-outline btn-primary btn-circle">2</a>
          <a href="#item3" className="btn btn-outline btn-primary btn-circle">3</a>
          <a href="#item4" className="btn btn-outline btn-primary btn-circle">4</a>
        </div>
        {/* <div className="btn btn-outline btn-primary">Customize</div> */}
      </div>
      <DueSoonPanel />
    </div>
  );
}