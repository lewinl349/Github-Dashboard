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
const languageGraph = createRoot(document.getElementById('language-graph'));
languageGraph.render(
  <Pie data={data} />
)


