import React, { useState } from "react";
import HeartDiseaseForm from './components/HeartDiseaseForm';
import FeatureImportanceChart from './components/FeatureImportanceChart';
import PredictionGauge from './components/PredictionGauge';

import "./App.css";

const App = () => {
  const [predictionProb, setPredictionProb] = useState(null);

  return (
    <div className="App">
      <HeartDiseaseForm setPredictionProb={setPredictionProb} />

      {predictionProb !== null && (
        <div style={{ marginTop: '2rem' }}>
          <PredictionGauge probability={predictionProb} />
        </div>
      )}

      <FeatureImportanceChart />
    </div>
  );
};

export default App;
