import React from "react";
import HeartDiseaseForm from './components/HeartDiseaseForm';
import FeatureImportanceChart from './components/FeatureImportanceChart';
import PredictionGauge from './components/PredictionGauge';

import "./App.css";

const App = () => {
  // example: pass prediction gauge prop from form later if needed
  const dummyProb = 0.87;

  return (
    <div className="App">
      <HeartDiseaseForm />
      <PredictionGauge probability={dummyProb} />
      <FeatureImportanceChart />
    </div>
  );
};

export default App;
