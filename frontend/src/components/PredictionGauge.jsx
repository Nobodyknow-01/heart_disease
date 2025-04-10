import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PredictionGauge = ({ probability }) => {
  if (probability === null || probability === undefined) return null;

  const percentage = Math.round(probability * 100);

  const riskLevel =
    percentage > 70 ? "High Risk" : percentage > 40 ? "Moderate Risk" : "Low Risk";

  const riskColor =
    percentage > 70 ? "#fa5252" : percentage > 40 ? "#fab005" : "#40c057";

  const riskLabel = {
    "High Risk": "🚨 High Risk",
    "Moderate Risk": "⚠️ Moderate Risk",
    "Low Risk": "✅ Low Risk"
  }[riskLevel];

  return (
    <div style={{ width: 180, margin: "2rem auto", textAlign: "center" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: riskColor,
          textColor: "#333",
          trailColor: "#eee",
          textSize: "18px",
          pathTransitionDuration: 0.75
        })}
      />
      <p style={{ marginTop: 12, fontSize: "1.1rem", fontWeight: "bold", color: riskColor }}>
        {riskLabel}
      </p>
      <p style={{ color: "#555", fontSize: "0.9rem" }}>
        Confidence of Prediction
      </p>
    </div>
  );
};

export default PredictionGauge;
