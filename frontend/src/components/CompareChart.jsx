import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CompareChart = ({ userData }) => {
  const healthyRanges = {
    age: 50,
    trestbps: 120,
    chol: 200,
    thalach: 150,
    oldpeak: 1,
  };

  const data = Object.keys(healthyRanges).map((key) => ({
    name: key.toUpperCase(),
    User: parseFloat(userData[key]) || 0,
    Healthy: healthyRanges[key],
  }));

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "2rem auto" }}>
      <h3 style={{ textAlign: "center", color: "#fff", marginBottom: "1rem" }}>📊 Your Health vs. Ideal</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
        >
          <XAxis type="number" stroke="#ccc" />
          <YAxis dataKey="name" type="category" stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="User" fill="#69db7c" name="You" barSize={18} />
          <Bar dataKey="Healthy" fill="#74c0fc" name="Healthy Range" barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompareChart;
