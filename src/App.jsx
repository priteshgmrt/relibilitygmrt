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



  const calculateReliability = (filtered, totalDays) => {
    // Total time (hours) in the selected period
    const totalTime = totalDays;
  
    // Calculate MTTR
    const totalDowntime = filtered.reduce((total, row) => {
      const pDateTime = new Date(`${row.PDate}T${row.PTime}`); // Combine problem detection date and time
      const sDateTime = new Date(`${row.SDate}T${row.STime}`); // Combine solving date and time
  
      // Ensure both times are valid
      if (!isNaN(pDateTime) && !isNaN(sDateTime)) {
        const repairTime = (sDateTime - pDateTime) / (1000 * 60 * 60); // Time difference in hours
        return total + (repairTime > 0 ? repairTime : 0); // Only count positive repair times
      }
      return total;
    }, 0);
  
    const mttr = filtered.length > 0 ? totalDowntime / filtered.length : 0; // Avoid division by zero
  

  
    // Calculate Failure Rate
    const failureRate = filtered.length / totalTime; // Failures per hour
  
    // Calculate MTBF (Mean Time Between Failures)
    const mtbf = failureRate > 0 ? 1 / failureRate : 0;
  
    // Calculate MTTF (Mean Time to Failure)
    const mttf = failureRate > 0 ? totalTime / filtered.length : 0;
  
    // Calculate Availability
    const availability = mtbf > 0 ? (mtbf / (mtbf + mttr)) * 100 : 0;
  
    // Calculate Reliability for a 1-hour period
    const reliability = Math.exp(-failureRate * 1) * 100; // 1-hour reliability as a percentage
  
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
      MTTF: mttf.toFixed(2) + " hours (non-repairable/replaceable) ",
      MTTR: filtered.length > 0 ? mttr.toFixed(2) + " hours" : "N/A",
      Downtime: totalDowntime.toFixed(2) + " hours",
      Availability: availability.toFixed(2) + "%",
      Reliability: reliability.toFixed(4) + "%",
      graphData1: {
        labels: years,
        datasets: [
          {
            label: "Failure Rate (Failures/Hour)",
            data: failureRates,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
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
          },
        ],
      },
      graphData3: {
        labels: years,
        datasets: [
          {
            label: "Availability (%)",
            data: availabilities,
            backgroundColor: "rgba(96, 188, 188, 0.2)",
            borderColor: "rgb(57, 193, 193)",
            borderWidth: 1,
          },
        ],
      },
    });
  };
  
  return (
    <div className="app">
      <Navbar />
      <div className="graph">{/* <Graph/> */}</div>
      <div className="content">
        <Guideliness />
        <Theory />
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
