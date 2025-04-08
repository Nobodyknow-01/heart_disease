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

  useEffect(() => {
    fetch("https://your-backend-url.onrender.com/feature-importance")
      .then((res) => res.json())
      .then((json) => setData(json.importance))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white/80 rounded-2xl shadow-xl backdrop-blur-md">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
        🔬 Feature Importance
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20 }}>
          <XAxis type="number" />
          <YAxis dataKey="feature" type="category" />
          <Tooltip />
          <Bar dataKey="importance">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#ef4444" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceChart;
