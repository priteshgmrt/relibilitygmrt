import React, { useState } from "react";
const Theory = () => {
  const [showReliability, setShowReliability] = useState(false); // Track if guidelines are shown
  return (
    <>
      <button
        className="reliability-button"
        onClick={() => setShowReliability(!showReliability)}
      >
        {showReliability ? "Hide reliability" : "Show reliability"}
      </button>
      {showReliability && (
        <div className="reliability">
          <h2>Reliability</h2>
          <p>Here are the guidelines for using the application:</p>
          <ul>
            <li>
              Use the dropdowns to filter data by system, antenna, or year.
            </li>
            <li>Enter a keyword to search specific records.</li>
            <li>Click "Filter Rows" to see updated metrics and charts.</li>
            <li>Ensure valid data is uploaded in the correct format.</li>
          </ul>
        </div>
      )}
      
    </>
  );
};

export default Theory;
