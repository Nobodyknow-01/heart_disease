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
    <div className="chart-container" style={{ height: 350, paddingTop: 40 }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        🔬 Feature Importance
      </h3>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          Loading feature importance...
        </div>
      ) : data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
            <XAxis type="number" />
            <YAxis type="category" dataKey="feature" />
            <Tooltip />
            <Bar dataKey="importance" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#ff6b6b" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ textAlign: "center" }}>No feature importance data found.</p>
      )}
    </div>
  );
};

export default FeatureImportanceChart;
