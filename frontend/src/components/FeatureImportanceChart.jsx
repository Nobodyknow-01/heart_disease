import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const FeatureImportanceChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://your-backend-url.onrender.com/feature-importance")
      .then((res) => res.json())
      .then((json) => setData(json.importance))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="chart-container" style={{ height: 350 }}>
      <h3>Feature Importance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="feature" />
          <Tooltip />
          <Bar dataKey="importance" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#69db7c" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceChart;
