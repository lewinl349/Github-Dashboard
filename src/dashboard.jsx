import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Sidebar from './components/Sidebar.jsx'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Render sidebar component
const sidebar = createRoot(document.getElementById('sidebar'))
sidebar.render(
  <StrictMode>
    <Sidebar/>
  </StrictMode>,
)

// ================= Graphs =================
// Languages chart
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};
const languageGraph = createRoot(document.getElementById('language-graph'));
languageGraph.render(
  <Pie data={data} />
)


