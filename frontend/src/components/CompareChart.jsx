import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
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
    <div style={{ width: "100%", maxWidth: 650, margin: "2rem auto" }}>
      <h3
        style={{
          textAlign: "center",
          color: "#2c3e50",
          fontSize: "1.5rem",
          marginBottom: "1.2rem",
        }}
      >
        📊 Your Health vs. Ideal
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <XAxis
            type="number"
            stroke="#ffffff"
            tick={{ fontSize: 14, fill: "#ffffff" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#ffffff"
            tick={{ fontSize: 16, fill: "#ffffff" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#f5f5f5", borderColor: "#ccc" }}
            itemStyle={{ color: "#2d3436" }}
            labelStyle={{ fontWeight: "bold", color: "#2c3e50" }}
          />
          <Legend
            wrapperStyle={{
              color: "#ecf0f1",
              fontWeight: 600,
              fontSize: 14,
              paddingBottom: "10px",
            }}
          />
          <Bar
            dataKey="User"
            fill="#00cec9"
            name="You"
            barSize={18}
            radius={[8, 8, 8, 8]}
          >
            <LabelList dataKey="User" position="right" fill="#ffffff" fontSize={12} />
          </Bar>
          <Bar
            dataKey="Healthy"
            fill="#636e72"
            name="Healthy Range"
            barSize={18}
            radius={[8, 8, 8, 8]}
          >
            <LabelList dataKey="Healthy" position="right" fill="#ffffff" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompareChart;
