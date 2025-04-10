import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PredictionGauge = ({ probability, risk }) => {
  if (probability === null || probability === undefined || !risk) return null;

  const percentage = Math.round(probability * 100);

  const riskColor = {
    high: "#fa5252",
    moderate: "#fab005",
    low: "#40c057"
  }[risk];

  const riskLabel = {
    high: "🚨 High Risk",
    moderate: "⚠️ Moderate Risk",
    low: "✅ Low Risk"
  }[risk];

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
