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
        if (json.importance && Array.isArray(json.importance)) {
          setData(json.importance);
        } else {
          console.error("Unexpected data:", json);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
        <div
      className="chart-container"
      style={{
        minHeight: "400px", // Increased height
        padding: "2rem 1rem 1rem 1rem", // balanced padding (removed too much top space)
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(6px)",
        borderRadius: "1rem",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        overflow: "hidden", // Ensures chart doesn't overflow
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          color: "#ff4c4c",
          fontFamily: "Segoe UI, sans-serif",
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        ❤️ Feature Importance
      </h3>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          Loading feature importance...
        </div>
      ) : data.length > 0 ? (
        <div style={{ height: "300px" }}>
          {/* Fixed height for chart so it doesn’t overflow */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
              <defs>
                <linearGradient id="gradientRed" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ff4c4c" />
                  <stop offset="100%" stopColor="#ff7e7e" />
                </linearGradient>
              </defs>

              <XAxis type="number" stroke="#eee" />
              <YAxis type="category" dataKey="feature" stroke="#eee" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#222",
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
              <Bar dataKey="importance">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="url(#gradientRed)" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#ccc" }}>
          No feature importance data found.
        </p>
      )}
    </div>

  );
};

export default FeatureImportanceChart;
