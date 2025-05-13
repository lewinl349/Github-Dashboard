import './app.css';
import './dashboard.css';
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
    <div className="main">
      <Sidebar />
      <div id="content">
        <div><h1>Github Companion Dashboard</h1></div>
        <div className="graphs">
          <div className="box">
            <h2>Most Used Languages</h2>
            <Pie data={generateLangData(langs)} options={options}/>
          </div>
          <div className="box">
            <h2>Most Used Languages</h2>
          </div>
        </div>
      </div>
    </div>
  );
}