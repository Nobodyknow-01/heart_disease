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
      <h3 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "1rem" }}>
        📊 Your Health vs. Ideal
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
        >
          <XAxis type="number" stroke="#34495e" />
          <YAxis dataKey="name" type="category" stroke="#34495e" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
            itemStyle={{ color: "#34495e" }}
            labelStyle={{ color: "#2c3e50" }}
          />
          <Legend
            wrapperStyle={{ color: "#2c3e50", fontWeight: 500 }}
          />
          <Bar dataKey="User" fill="#00b894" name="You" barSize={18} />
          <Bar dataKey="Healthy" fill="#b2bec3" name="Healthy Range" barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompareChart;
