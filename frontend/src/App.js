import React from "react";
import HeartDiseaseForm from "./components/HeartDiseaseForm";
import FeatureImportanceChart from "./components/FeatureImportanceChart";
import PredictionGauge from "./components/PredictionGauge";

import "./App.css";

const App = () => {
  const dummyProb = 0.87; // Placeholder

  return (
    <div className="App">
      <div className="pt-10 px-4">
        <HeartDiseaseForm />
      </div>

      <div className="pt-10">
        <PredictionGauge probability={dummyProb} />
      </div>

      <div className="pt-10 pb-20">
        <FeatureImportanceChart />
      </div>
    </div>
  );
};

export default App;
