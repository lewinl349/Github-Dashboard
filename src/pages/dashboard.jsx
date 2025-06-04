import '../app.css';
import Sidebar from '../components/Sidebar.jsx';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Bar, Doughnut } from "react-chartjs-2";

// ================= Graphs =================
// Languages chart
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);


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
function generateLangDataPie(map) {
  var langs = [];
  var bytes = [];

  for (var [key, value] of Object.entries(map)) {
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

function StatBox({ title, stat }) {
  return (
    <div className="w-55 bg-base-100 rounded-box p-5">
      <h1 className="text-m">{title}</h1>
      <p className="text-4xl font-bold">{stat}</p>
    </div>
  )
}

// ================= Layout =================

export default function Dashboard({ langs }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="grid grid-cols-4 grid-rows-6 gap-5 m-5">
        <StatBox title={"# of Repos"} stat={"25"} />
        <StatBox title={"Contributions"} stat={"521"} />
        <StatBox title={"Stars"} stat={"18"} />
        <div className="row-start-2 col-span-2 row-span-3 flex flex-col bg-base-100 p-5 items-center">
          <div className="carousel rounded-box w-100">
            <div id="item1" className="carousel-item w-full">
              <div className="card shadow-sm w-100">
                <figure>
                  <Pie data={generateLangDataPie(langs)} options={options} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Most Used Languages</h2>
                  <p>Pie Chart | File Size in Bytes</p>
                </div>
              </div>
            </div>
            <div id="item2" className="carousel-item w-full">
              <div className="card bg-base-100 w-100 shadow-sm">
                <figure>
                  <Bar data={generateLangDataBar(langs)} options={options} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Most Used Languages</h2>
                  <p>Bar Graph | File Size in Bytes</p>
                </div>
              </div>
            </div>
            <div id="item3" className="carousel-item w-full">
              <div className="card bg-base-100 w-100 shadow-sm">
                <figure>
                  <Doughnut data={generateLangDataPie(langs)} options={options} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Most Used Languages</h2>
                  <p>Doughnut Chart | File Size in Bytes</p>
                </div>
              </div>
            </div>
            <div id="item4" className="carousel-item w-full">
              <div className="card bg-base-100 w-100 shadow-sm">
                <div className="card-body">
                  <h2 className="card-title text-center">More coming soon!</h2>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center gap-2 py-2">
            <a href="#item1" className="btn btn-circle">1</a>
            <a href="#item2" className="btn btn-circle">2</a>
            <a href="#item3" className="btn btn-circle">3</a>
            <a href="#item4" className="btn btn-circle">4</a>
          </div>
          <div className="btn rounded-box">Customize</div>
        </div>

        <div className="col-span-2 row-span-3 list-row bg-base-100 p-5 rounded-box">
          <ul>
            <li className="text-xl font-bold">Upcoming</li>
          </ul>
        </div>
      </div>

    </div>
  );
}