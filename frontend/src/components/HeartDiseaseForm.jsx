import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const HeartDiseaseForm = ({ setPredictionProb, setUserInputData, setRiskLevel }) => {
  const [formData, setFormData] = useState({
    age: "", sex: "", cp: "", trestbps: "", chol: "", fbs: "",
    restecg: "", thalach: "", exang: "", oldpeak: "", slope: "", ca: "", thal: ""
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
      age: [29, 77], sex: [0, 1], cp: [0, 3], trestbps: [94, 200],
      chol: [126, 564], fbs: [0, 1], restecg: [0, 2], thalach: [71, 202],
      exang: [0, 1], oldpeak: [0, 6.2], slope: [0, 2], ca: [0, 4], thal: [1, 3]
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
      }
    } catch (err) {
      setError("❌ Could not connect to server.");
      setResult(null);
      setPredictionProb(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Heart Disease Prediction Report", 14, 20);

    const rows = Object.entries(formData).map(([key, value]) => [key.toUpperCase(), value]);

    autoTable(doc, {
      startY: 30,
      head: [["Parameter", "Value"]],
      body: rows,
    });

    doc.text(`Prediction: ${result.prediction}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(`Probability: ${(result.probability * 100).toFixed(2)}%`, 14, doc.lastAutoTable.finalY + 30);

    doc.save("heart_disease_prediction.pdf");
  };

  const parameterLabels = {
    age: "Age (29-77)", sex: "Sex (1 = M, 0 = F)", cp: "Chest Pain Type (0-3)",
    trestbps: "Resting BP (94-200)", chol: "Cholesterol (126-564)",
    fbs: "Fasting Sugar (0 or 1)", restecg: "ECG (0-2)", thalach: "Max HR (71-202)",
    exang: "Angina (0 or 1)", oldpeak: "ST Depression (0-6.2)",
    slope: "ST Slope (0-2)", ca: "Vessels (0-4)", thal: "Thalassemia (1-3)"
  };

  return (
    <div className="heart-form-container" style={{ padding: "1rem", maxWidth: "700px", margin: "auto" }}>
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="title center-title"
        style={{
          textAlign: 'center', fontSize: '2.5rem', color: '#FFFFFF',
          fontWeight: '800', marginBottom: '1.5rem'
        }}
      >
        ❤️ Heart Disease Prediction ❤️
      </motion.h1>

      <form onSubmit={handleSubmit} className="form-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem'
      }}>
        {Object.keys(formData).map((key) => (
          <motion.div
            key={key}
            className="form-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'flex', flexDirection: 'column', background: '#f4f6f7',
              padding: '1rem', borderRadius: '12px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.08)'
            }}
          >
            <label style={{ fontWeight: '600', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
              {parameterLabels[key]}
            </label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              style={{
                padding: '10px', borderRadius: '8px',
                border: '1px solid #ccc', fontSize: '1rem'
              }}
            />
          </motion.div>
        ))}

        <div style={{ textAlign: "center" }}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: "#00b894", color: "#fff",
              padding: "12px 28px", fontSize: "1.1rem",
              borderRadius: "10px", border: "none",
              cursor: "pointer", fontWeight: "bold",
              width: "100%", maxWidth: "300px"
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
            color: "#fff", backgroundColor: "#e74c3c", padding: "1rem",
            marginTop: "1.5rem", borderRadius: "10px", fontWeight: "bold",
            fontSize: "1rem", textAlign: "center"
          }}
        >
          {error}
        </motion.div>
      )}

      {result && (
        <motion.div
          className="result-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundColor: "#dff9fb", padding: "1.5rem",
            borderRadius: "12px", marginTop: "2rem", textAlign: "center"
          }}
        >
          {result.prediction === "No Disease" && <Confetti />}
          <h2 style={{ color: "#2c3e50", fontSize: "1.5rem" }}>Prediction Result:</h2>
          <p style={{ fontSize: "1.2rem" }}>
            <strong>{result.prediction}</strong>
          </p>
          <p style={{ fontSize: "1rem" }}>
            Probability: <strong>{(result.probability * 100).toFixed(2)}%</strong>
          </p>

          <motion.button
            onClick={handleExportPDF}
            whileHover={{ scale: 1.05 }}
            style={{
              marginTop: "1.2rem", padding: "10px 22px", fontSize: "1rem",
              backgroundColor: "#0984e3", color: "#fff", border: "none",
              borderRadius: "8px", cursor: "pointer", fontWeight: "bold"
            }}
          >
            📄 Export as PDF
          </motion.button>

          <motion.p
            className="consult-msg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ marginTop: "1rem", color: "#636e72", fontSize: "0.95rem" }}
          >
            💡 Consult a doctor if you have concerns.
          </motion.p>
        </motion.div>
      )}

      <footer style={{
        background: '#f1f1f1', padding: '1rem',
        borderRadius: '12px', marginTop: '2rem',
        fontSize: '0.9rem', color: '#2d3436'
      }}>
        <h3 style={{ marginBottom: '0.8rem' }}>💡 Parameter Guide</h3>
        <p><strong>CA (0-4):</strong> Major vessels colored by fluoroscopy.</p>
        <p><strong>Thal (1-3):</strong> 1 = Normal, 2 = Fixed, 3 = Reversible defect.</p>
        <p><strong>CP (0-3):</strong> 0 = Typical angina, 3 = Asymptomatic.</p>
        <p><strong>RestECG (0-2):</strong> 0 = Normal, 2 = LV hypertrophy.</p>
      </footer>
    </div>
  );
};

export default HeartDiseaseForm;
