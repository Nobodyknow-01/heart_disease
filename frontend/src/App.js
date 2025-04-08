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
      {predictionProb !== null && <PredictionGauge probability={predictionProb} />}
      <FeatureImportanceChart />
    </div>
  );
};

export default App;
