import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const HeartDiseaseForm = ({ setPredictionProb, setUserInputData, setRiskLevel }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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

    for (const key in formData) {
      const [min, max] = validRanges[key];
      const value = parseFloat(formData[key]);
      if (isNaN(value) || value < min || value > max) {
        setError(`❌ ${key.toUpperCase()} must be between ${min} and ${max}.`);
        setResult(null);
        setPredictionProb(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    try {
      const response = await axios.post("https://heart-disease-z6ru.onrender.com/predict", formData);
      if (response.status === 200) {
        setResult(response.data);
        setPredictionProb(response.data.probability);
        setUserInputData(formData);
        setRiskLevel(response.data.risk);
        setError("");
      } else {
        setError("❌ An unexpected error occurred.");
        setResult(null);
        setPredictionProb(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      setError("❌ Could not connect to server.");
      setResult(null);
      setPredictionProb(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const parameterLabels = {
    age: "Age (29-77 years)",
    sex: "Sex (1 = Male, 0 = Female)",
    cp: "Chest Pain Type (0-3)",
    trestbps: "Resting Blood Pressure (94-200 mmHg)",
    chol: "Serum Cholesterol (126-564 mg/dl)",
    fbs: "Fasting Blood Sugar (>120 mg/dl, 1 = True, 0 = False)",
    restecg: "Resting ECG Results (0 = Normal, 1 = ST-T wave abnormality, 2 = Left ventricular hypertrophy)",
    thalach: "Max Heart Rate (71-202 bpm)",
    exang: "Exercise-Induced Angina (1 = Yes, 0 = No)",
    oldpeak: "ST Depression (0.0-6.2)",
    slope: "Slope of ST Segment (0 = Upsloping, 1 = Flat, 2 = Downsloping)",
    ca: "Number of Major Vessels (0-4)",
    thal: "Thalassemia (1 = Normal, 2 = Fixed defect, 3 = Reversible defect)"
  };

  return (
    <div className="heart-form-container">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="title center-title"
        style={{
          textAlign: 'center',
          fontSize: '3.5rem',
          color: '#2c3e50',
          fontWeight: '800',
          marginBottom: '2rem'
        }}
      >
        ❤️ Heart Disease Prediction
      </motion.h1>

      <form onSubmit={handleSubmit} className="form-grid">
        {Object.keys(formData).map((key) => (
          <motion.div
            key={key}
            className="form-item"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#f4f6f7',
              padding: '1rem',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginBottom: '1rem'
            }}
          >
            <label style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              {parameterLabels[key]}
            </label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
          </motion.div>
        ))}

        <div className="button-container" style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              backgroundColor: "#00b894",
              color: "#fff",
              padding: "12px 28px",
              fontSize: "1.2rem",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            Predict
          </motion.button>
        </div>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            color: "#fff",
            backgroundColor: "#e74c3c",
            padding: "15px 25px",
            margin: "20px auto",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            textAlign: "center",
            maxWidth: "500px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
        >
          ❌ {error}
        </motion.div>
      )}

      {result && (
        <motion.div
          className="result-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundColor: "#dff9fb",
            padding: "2rem",
            borderRadius: "12px",
            marginTop: "2rem",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
          }}
        >
          {result.prediction === "No Disease" && <Confetti />}
          <h2 style={{ color: "#2c3e50" }}>Prediction Result:</h2>
          <p className="large-prediction" style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>
            Prediction: <strong>{result.prediction}</strong>
          </p>
          <p style={{ fontSize: "1.2rem" }}>
            Probability: <strong>{(result.probability * 100).toFixed(2)}%</strong>
          </p>
          <motion.p
            className="consult-msg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ marginTop: "1rem", color: "#636e72" }}
          >
            💡 If you have concerns, consult with a healthcare professional.
          </motion.p>
        </motion.div>
      )}

      <footer
        className="footer-section"
        style={{
          background: '#f1f1f1',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          marginTop: '30px',
          fontSize: '0.95rem',
          color: '#2d3436'
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>💡 Parameter Guide</h3>
        <p><strong>CA (0-4):</strong> Number of major vessels colored by fluoroscopy.</p>
        <p><strong>Thal (1-3):</strong> Thalassemia (1 = Normal, 2 = Fixed defect, 3 = Reversible defect).</p>
        <p><strong>CP (0-3):</strong> Chest pain types: 0 = Typical angina, 1 = Atypical angina, 2 = Non-anginal pain, 3 = Asymptomatic.</p>
        <p><strong>RestECG (0-2):</strong> Resting ECG results: 0 = Normal, 1 = ST-T wave abnormality, 2 = Left ventricular hypertrophy.</p>
      </footer>
    </div>
  );
};

export default HeartDiseaseForm;
