import React from "react";
import { motion } from "framer-motion";

const tips = {
  high: [
    "🏥 Consult a cardiologist immediately.",
    "🥗 Follow a heart-healthy, low-fat diet.",
    "🚭 Quit smoking and avoid alcohol.",
    "🏃‍♂️ Begin light to moderate physical activity (with medical advice).",
    "💊 Take prescribed medications regularly."
  ],
  moderate: [
    "📅 Schedule regular heart checkups.",
    "🍽️ Monitor your salt, sugar, and cholesterol intake.",
    "🚶‍♂️ Aim for 30 minutes of daily walking.",
    "🧘‍♂️ Manage stress through mindfulness or yoga."
  ],
  low: [
    "✅ Maintain a balanced diet and active lifestyle.",
    "🧘‍♀️ Keep stress low with regular breaks.",
    "🚰 Stay hydrated and get enough sleep.",
    "🩺 Continue regular annual checkups."
  ]
};

const Recommendations = ({ risk }) => {
  if (!risk || !tips[risk]) return null;

  return (
    <motion.div
      className="recommendation-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: "#f9f9f9",
        padding: "1.5rem",
        borderRadius: "12px",
        margin: "2rem auto",
        maxWidth: 600,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        color: "#333"
      }}
    >
      <h3 style={{ color: risk === "high" ? "#e03131" : risk === "moderate" ? "#f08c00" : "#2f9e44" }}>
        {risk === "high" && "🚨 High Risk Recommendations"}
        {risk === "moderate" && "⚠️ Moderate Risk Suggestions"}
        {risk === "low" && "✅ Tips for Maintaining Good Heart Health"}
      </h3>
      <ul style={{ marginTop: "1rem", paddingLeft: "1rem", lineHeight: 1.6 }}>
        {tips[risk].map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Recommendations;
