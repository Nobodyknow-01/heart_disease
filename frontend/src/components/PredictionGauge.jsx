import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PredictionGauge = ({ probability }) => {
  const percentage = Math.round(probability * 100);

  return (
    <div style={{ width: 150, margin: "0 auto" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: probability > 0.7 ? "#fa5252" : probability > 0.4 ? "#fab005" : "#40c057",
          textColor: "#333",
        })}
      />
      <p style={{ textAlign: "center", marginTop: 8 }}>
        Confidence of Prediction
      </p>
    </div>
  );
};

export default PredictionGauge;
