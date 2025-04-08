import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";


const FeatureImportanceChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://heart-disease-z6ru.onrender.com/feature-importance")
      .then((res) => res.json())
      .then((json) => {
        setData(json.importance);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        marginTop: "2rem",
        marginBottom: "2rem",
        background: "rgba(255,255,255,0.9)",
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        width: "90%",
        maxWidth: "700px",
        marginLeft: "auto",
        marginRight: "auto",
        animation: "fadeIn 0.8s ease-in-out",
      }}
    >
      <h2 style={{ color: "#444", marginBottom: "1rem", textAlign: "center" }}>
        🔬 Feature Importance
      </h2>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading feature importance...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
            <XAxis type="number" />
            <YAxis type="category" dataKey="feature" />
            <Tooltip />
            <Bar dataKey="importance">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#69db7c" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FeatureImportanceChart;
