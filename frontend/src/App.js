import React, { useState } from "react";
import HeartDiseaseForm from './components/HeartDiseaseForm';
import FeatureImportanceChart from './components/FeatureImportanceChart';
import PredictionGauge from './components/PredictionGauge';
import CompareChart from './components/CompareChart';
import Recommendations from './components/Recommendations';

import "./App.css";

const App = () => {
  const [predictionProb, setPredictionProb] = useState(null);
  const [userInputData, setUserInputData] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);

  return (
    <div className="App">
      <HeartDiseaseForm
        setPredictionProb={setPredictionProb}
        setUserInputData={setUserInputData}
        setRiskLevel={setRiskLevel}
      />

      {predictionProb !== null && (
        <div style={{ marginTop: '2rem' }}>
          <PredictionGauge probability={predictionProb} risk={riskLevel} />
        </div>
      )}

      {riskLevel && <Recommendations risk={riskLevel} />}

      {userInputData && <CompareChart userData={userInputData} />}

      <FeatureImportanceChart />
    </div>
  );
};

export default App;