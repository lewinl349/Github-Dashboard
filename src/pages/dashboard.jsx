import '../app.css';
import Sidebar from '../components/Sidebar.jsx';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { useQuery } from '@tanstack/react-query';
import { IconContext } from "react-icons";
import { CgFolderAdd, CgFlagAlt } from "react-icons/cg";
import { GoFileCode, GoFlame, GoGitPullRequest, GoStar } from "react-icons/go";

// ================= Graphs =================
// Languages chart
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// ================= CHARTJS SETUP =================

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    }
  }
}

// Take in a map of languages and bytes used
// Turn it into a ChartJS format
function generateLangDataPie(obj) {
  var toSort = [];
  var langs = [];
  var bytes = [];

  for (var [key, value] of Object.entries(obj)) {
    toSort.push([key, value]);
  }

  // Negative if second number goes first, etc...
  toSort.sort((x,y) => y[1] - x[1]);
  if (toSort.length > 10) {
    toSort = toSort.slice(0, 10);
  }

  for (var [key, value] of toSort) {
    langs.push(key);
    bytes.push(value);
  }

  const data = {
    labels: langs,
    datasets: [{
      label: 'Size of Files (Bytes)',
      data: bytes,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(255, 159, 64)'

      ],
      borderColor: [
        'rgb(123, 49, 65)',
        'rgb(27, 85, 123)',
        'rgb(131, 104, 42)',
        'rgb(51, 122, 122)',
        'rgb(131, 86, 41)'
      ],
      hoverOffset: 4
    }]
  };

  return data;
}

function generateLangDataBar(map) {
  var langs = [];
  var bytes = [];

  for (var [key, value] of Object.entries(map)) {
    langs.push(key);
    bytes.push(value);
  }

  const data = {
    labels: langs,
    datasets: [{
      label: 'Usage',
      data: bytes,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }]
  };

  return data;
}

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
    <IconContext.Provider value={{ className: "h-8 w-8 mr-2" }}>
      <div className="col-span-5 flex p-5 bg-base-100 border border-gray-400">
        <img src={data.pfp}
          className="mx-5 w-20 h-20"></img>
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {data.nickname || data.name}!</h1>
          <p className="py-4">
            Here's your summary for today:
          </p>
          <div className="flex gap-5">
            <div>
              <h1 className="text-m">Due Today</h1>
              <p className="text-4xl font-bold">4</p>
            </div>
            <div>
              <h1 className="text-m">Open Issues</h1>
              <p className="text-4xl font-bold">12</p>
            </div>
          </div>
        </div>
      </div>
      <StatBox title={"# of Repos"} stat={data.num_of_repos} children={<GoFileCode />} />
      <StatBox title={"Commits (Past Year)"} stat={data.num_of_comm} children={<GoFlame /> } />
      <StatBox title={"Pull Req. (Past Year)"} stat={data.num_of_pull} children={<GoGitPullRequest /> } />
      <StatBox title={"Issues (Past Year)"} stat={data.num_of_issue} children={<CgFlagAlt /> } />
      <StatBox title={"Stars"} stat={data.num_of_stars} children={<GoStar /> } />
    </IconContext.Provider>

  )
}

function GraphsCaro() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['langData'],
    queryFn: async () => {
      const response = await fetch(
        'http://localhost:3000/repos/langs',
      )
      return await response.json()
    },
  })

  if (isPending) return (<span className="loading loading-spinner text-primary"></span>)

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="carousel rounded-box w-150">
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

// ================= LAYOUT =================

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="grid grid-flow-col md:grid-flow-row gap-5 m-5">
        <WelcomeBanner />
        <div className="row-start-3 col-span-3 row-span-3 flex flex-col bg-base-100 p-5 items-center border border-gray-400">
          <GraphsCaro />
          <div className="flex w-full justify-center gap-2 py-2">
            <a href="#item1" className="btn btn-circle">1</a>
            <a href="#item2" className="btn btn-circle">2</a>
            <a href="#item3" className="btn btn-circle">3</a>
            <a href="#item4" className="btn btn-circle">4</a>
          </div>
          <div className="btn rounded-box">Customize</div>
        </div>

        <div className="col-span-2 row-span-3 list-row bg-base-100 p-5 rounded-box border border-gray-400">
          <ul>
            <li className="text-xl font-bold">Upcoming</li>
          </ul>
        </div>
      </div>

    </div>
  );
}