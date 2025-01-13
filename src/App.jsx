import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dropdowns from "./components/Dropdowns";
import Reliability from "./components/Reliability";
import Guideliness from "./components/Guideliness";
import Theory from "./components/Theory";
import UploadExcel from "./components/UploadExcel";
import Graph from "./components/Graph";
import "./App.css";

const App = () => {
  const [reliabilityMetrics, setReliabilityMetrics] = useState(null);

  const calculateReliability = (filtered) => {
    const totalDays = 8760; // Total hours in a year
    const totalTime = totalDays; // Total time (hours)
    const mttr = 5; // Mean Time to Repair (hours)

    // Calculate Failure Rate, MTBF, MTTF, and Availability
    const failureRate = filtered.length / totalTime;
    const mtbf = failureRate > 0 ? 1 / failureRate : 0;
    const mttf = failureRate > 0 ? totalTime / filtered.length : 0;
    const availability = mtbf > 0 ? (mtbf / (mtbf + mttr)) * 100 : 0;

    // Calculate Downtime
    const downtime = filtered.length * mttr;

    // Calculate Reliability (for a given period, e.g., 1 hour)
    const reliability = Math.exp(-failureRate * 1); // 1-hour reliability

    // Year-wise calculations
    const years = [
      ...new Set(filtered.map((row) => new Date(row.PDate).getFullYear())),
    ];
    const failureRates = years.map(
      (year) =>
        filtered.filter((row) => new Date(row.PDate).getFullYear() === year)
          .length / totalDays
    );
    const mtbfs = failureRates.map((rate) => (rate > 0 ? 1 / rate : 0));
    const availabilities = mtbfs.map((mtbf) =>
      mtbf > 0 ? (mtbf / (mtbf + mttr)) * 100 : 0
    );

    setReliabilityMetrics({
      failureRate: failureRate.toFixed(4) + " failures/hour ",
      MTBF: mtbf.toFixed(2) + " hours (repairable) ",
      MTTF: mttf.toFixed(2) + " hours (non-repairable/replacable) ",
      Downtime: downtime.toFixed(2) + " hours",
      Availability: availability.toFixed(2) + "%",
      Reliability: reliability.toFixed(4),
      graphData1: {
        labels: years,
        datasets: [
          {
            label: "Failure Rate (Failures/Hour)",
            data: failureRates,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          }
         
        ],
      },
      graphData2: {
        labels: years,
        datasets: [
          {
            label: "MTBF (Hours)",
            data: mtbfs,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          }

        ],
      },
      graphData3: {
        labels: years,
        datasets: [
          {
            label: "Availability (%)",
            data: availabilities,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    });
  };

  return (
    <div className="app">
      <Navbar />
      <div className="graph">
        {/* <Graph/> */}
      </div>
      <div className="content">
      <Guideliness />
      <Theory/>
        <h1 className="hh">Reliability of GMRT</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Dropdowns calculateReliability={calculateReliability} />
                <Reliability metrics={reliabilityMetrics} />
                
              </>
            }
          />
          <Route path="/upload-excel" element={<UploadExcel />} />
        </Routes>
        
      </div>
      
      {/* create a new div tag for only graph */}
      
      <Footer />
    </div>
  );
};

export default App;
