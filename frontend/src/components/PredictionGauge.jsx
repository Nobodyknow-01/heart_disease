import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PredictionGauge = ({ prediction, probability }) => {
  if (probability === null || probability === undefined || prediction === null) return null;

  const percentage = Math.round(probability * 100);

  // Determine risk level based on prediction (0 = healthy, 1 = disease)
  let riskLevel, riskColor, riskLabel;

  if (prediction === 1) {
    // Disease predicted
    riskLevel = percentage > 70 ? "High Risk" : percentage > 40 ? "Moderate Risk" : "Low Risk";
  } else {
    // Healthy predicted
    riskLevel = percentage > 70 ? "Low Risk" : percentage > 40 ? "Moderate Risk" : "High Risk";
  }

  riskColor =
    riskLevel === "High Risk" ? "#fa5252" :
    riskLevel === "Moderate Risk" ? "#fab005" :
    "#40c057";

  riskLabel = {
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
