import React, { forwardRef } from "react";

const HealthReport = forwardRef(({ userData, result, probability, risk }, ref) => {
  return (
    <div ref={ref} style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>Heart Disease Report</h2>

      <hr />

      <h3 style={{ color: "#34495e" }}>User Input:</h3>
      <ul>
        {Object.entries(userData).map(([key, value]) => (
          <li key={key}>
            <strong>{key.toUpperCase()}:</strong> {value}
          </li>
        ))}
      </ul>

      <h3 style={{ color: "#34495e", marginTop: "1rem" }}>Prediction Result:</h3>
      <p>
        <strong>Status:</strong> {result === 1 ? "High Risk" : "Low Risk"}
        <br />
        <strong>Confidence:</strong> {Math.round(probability * 100)}%
        <br />
        <strong>Risk Level:</strong> {risk.toUpperCase()}
      </p>
    </div>
  );
});

export default HealthReport;
