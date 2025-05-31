import './app.css';
import Sidebar from './components/Sidebar.jsx';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from 'react';

// ================= Graphs =================
// Languages chart
ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false
}

// Take in a map of languages and bytes used
// Turn it into a ChartJS format
function generateLangData(map) {
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
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      borderColor: [
        'rgb(123, 49, 65)',
        'rgb(27, 85, 123)',
        'rgb(131, 104, 42)',
      ],
      hoverOffset: 4
    }]
  };

  return data;
}

// ================= Layout =================

export default function Dashboard() {
  const [langs, setLangs] = useState(new Map());

  useEffect(() => {
    fetch('http://localhost:3000/repos/langs')
      .then((res) => res.json())
      .then((data) => setLangs(data))
      .catch((err) => console.error('Failed to fetch repos:', err));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-col p-5">
        <div>Github Companion Dashboard</div>
        <div className="carousel w-100 rounded-box">
          <div id="item1" className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <Pie data={generateLangData(langs)} options={options} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Most Used Languages</h2>
                <p></p>
              </div>
            </div>
          </div>
          <div id="item2" className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <Pie data={generateLangData(langs)} options={options} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Most Used Languages</h2>
                <p></p>
              </div>
            </div>
          </div>
          <div id="item3" className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <Pie data={generateLangData(langs)} options={options} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Most Used Languages</h2>
                <p></p>
              </div>
            </div>
          </div>
          <div id="item4" className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <Pie data={generateLangData(langs)} options={options} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Most Used Languages</h2>
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
      </div>
    </div>
  );
}