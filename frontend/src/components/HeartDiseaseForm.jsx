import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const HeartDiseaseForm = () => {
  // ✅ Always define hooks at the top
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: ""
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ✅ SSR-safe early return using useEffect if needed
  if (typeof window === "undefined") {
    return <></>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validRanges = {
      age: [29, 77],
      sex: [0, 1],
      cp: [0, 3],
      trestbps: [94, 200],
      chol: [126, 564],
      fbs: [0, 1],
      restecg: [0, 2],
      thalach: [71, 202],
      exang: [0, 1],
      oldpeak: [0, 6.2],
      slope: [0, 2],
      ca: [0, 4],
      thal: [1, 3]
    };

    const [min, max] = validRanges[name];
    const numericValue = parseFloat(value);

    if (value === "" || (numericValue >= min && numericValue <= max)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://heart-disease-z6ru.onrender.com/predict", formData);
      if (response.status === 200) {
        setResult(response.data);
      } else {
        setError("❌ An unexpected error occurred.");
      }
    } catch (err) {
      setError("❌ Could not connect to server.");
    }
  };

  const parameterLabels = {
    age: "Age",
    sex: "Sex (0 = Female, 1 = Male)",
    cp: "Chest Pain Type (0-3)",
    trestbps: "Resting Blood Pressure",
    chol: "Serum Cholesterol",
    fbs: "Fasting Blood Sugar > 120 mg/dl (1 = True; 0 = False)",
    restecg: "Resting ECG (0-2)",
    thalach: "Max Heart Rate",
    exang: "Exercise-Induced Angina (1 = Yes; 0 = No)",
    oldpeak: "ST Depression",
    slope: "Slope of ST (0-2)",
    ca: "Major Vessels (0-4)",
    thal: "Thalassemia (1 = Normal; 2 = Fixed Defect; 3 = Reversible Defect)"
  };

  return (
    <div className="heart-form-container">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="title center-title"
        style={{ textAlign: 'center', fontSize: '3.5rem', color: '#fff' }}
      >
        ❤️ Heart Disease Prediction ❤️
      </motion.h1>

      <form onSubmit={handleSubmit} className="form-grid">
        {Object.keys(formData).map((key) => (
          <motion.div
            key={key}
            className="form-item"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <label>{parameterLabels[key]}</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </motion.div>
        ))}

        <div className="button-container">
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Predict
          </motion.button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}
      {result && (
        <motion.div
          className="result-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {result.prediction === "No Disease" && <Confetti />}
          <h2>Prediction Result:</h2>
          <p className="large-prediction">Prediction: <strong>{result.prediction}</strong></p>
          <p>Probability: <strong>{result.probability}</strong></p>
          <motion.p className="consult-msg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            💡 If you have concerns, consult with a healthcare professional.
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default HeartDiseaseForm;
