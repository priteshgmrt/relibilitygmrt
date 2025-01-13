import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ metrics }) => {
  if ( !metrics.graphData1) {
    return null; // Render nothing if metrics or graphData is unavailable
  }z
  if ( !metrics.graphData2) {
    return null; // Render nothing if metrics or graphData is unavailable
  }
  if ( !metrics.graphData3) {
    return null; // Render nothing if metrics or graphData is unavailable
  }

  return (
    <>
      <div className="chart-container">
        <Bar data={metrics.graphData1}/>
        <Bar data={metrics.graphData2} />
        <Bar data={metrics.graphData3} />
      </div>
    </>
  );
};

export default Graph;