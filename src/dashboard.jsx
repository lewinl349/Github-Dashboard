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

const data = {
  labels: [
    'Ruby',
    'Python',
    'Java'
  ],
  datasets: [{
    label: 'Usage',
    data: [0.4, 0.5, 0.1],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    borderColor: [
      'rgb(123, 49, 65)',
      'rgb(27, 85, 123)',
      'rgb(131, 104, 42)'
    ],
    hoverOffset: 4
  }]
};

// ================= Layout =================

export default function Dashboard() {
  return (
    <div className="main">
      <Sidebar />
      <div id="content">
        <div><h1>Github Companion Dashboard</h1></div>
        <div className="graphs">
          <div className="box">
            <h2>Most Used Languages</h2>
            <Pie data={data} options={options}/>
          </div>
          <div className="box">
            <h2>Most Used Languages</h2>
          </div>
        </div>
      </div>
    </div>
  );
}