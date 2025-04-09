import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import axios from 'axios';
import './App.css';

const FeatureImportanceChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImportance = async () => {
      try {
        const response = await axios.get('https://heartapi-ml.onrender.com/feature-importance');
        if (response.data && response.data.importance) {
          setData(response.data.importance);
        }
      } catch (error) {
        console.error('Error fetching feature importance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImportance();
  }, []);

  return (
    <div className="feature-chart-container">
      <h2 className="chart-title">🩺 Feature Importance</h2>
      {loading ? (
        <div className="spinner-container">
          <div className="heart-loader"></div>
          <div>Loading feature importance...</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis type="number" stroke="#555" />
            <YAxis dataKey="feature" type="category" stroke="#555" />
            <Tooltip />
            <Bar dataKey="importance" fill="url(#heartGradient)" radius={[10, 10, 10, 10]}>
              <LabelList dataKey="importance" position="right" />
            </Bar>
            <defs>
              <linearGradient id="heartGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff4d6d" />
                <stop offset="100%" stopColor="#ff7b9c" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FeatureImportanceChart;
