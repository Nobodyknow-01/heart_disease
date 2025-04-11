import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PredictionGauge = ({ probability, risk }) => {
  if (probability === null || probability === undefined || !risk) return null;

  const percentage = Math.round(probability * 100);

  const riskColor = {
    high: "#e74c3c",
    moderate: "#f39c12",
    low: "#2ecc71",
  }[risk];

  const riskLabel = {
    high: "🚨 High Risk",
    moderate: "⚠️ Moderate Risk",
    low: "✅ Low Risk",
  }[risk];

  return (
    <div style={{
      width: 220,
      margin: "2.5rem auto",
      padding: "1rem",
      textAlign: "center",
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(6px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    }}>
      <div style={{ width: 180, margin: "0 auto" }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: riskColor,
            textColor: "#ffffff",
            trailColor: "#dfe6e9",
            textSize: "20px",
            pathTransitionDuration: 1,
            strokeLinecap: "round"
          })}
        />
      </div>

      <p style={{
        marginTop: "1rem",
        fontSize: "1.3rem",
        fontWeight: "600",
        color: riskColor,
      }}>
        {riskLabel}
      </p>

      <p style={{
        fontSize: "0.95rem",
        color: "#ecf0f1",
        marginTop: "0.4rem"
      }}>
        Confidence of Prediction
      </p>
    </div>
  );
};

export default PredictionGauge;
