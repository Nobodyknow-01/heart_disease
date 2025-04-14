# ❤️ Heart Disease Prediction Web Application

## 📌 Project Overview
This is a user-friendly web application that predicts the likelihood of heart disease based on user-provided health parameters. It leverages a powerful XGBoost machine learning model and is designed to deliver fast, accurate predictions with engaging visuals and personalized recommendations.

## 👤 Author
This project is built by an individual developer with guidance and support from ChatGPT. The aim is to help users identify heart disease risks early and take proactive health measures.

## 🚀 Live Demo
[https://heart-disease-z6ru.onrender.com](https://heart-disease-z6ru.onrender.com) (Replace with your domain if hosted)

---

## 🛠️ Tech Stack
**Frontend:** React.js, Framer Motion, Confetti, jsPDF  
**Backend:** FastAPI (Python)  
**Machine Learning Model:** XGBoost  
**Deployment:** Render (for API), Vercel/Netlify (for frontend)

---

## 📊 Features
- Stylish animated heart-themed UI 🌟
- Parameter validation with detailed tooltips and labels
- Interactive prediction with probability score
- Beautiful result cards with Confetti for good outcomes 🎉
- Export predictions as PDF 📄
- Health-based visual explanations and charts 📈
- Personalized recommendations (Coming Soon)

---

## 🧠 ML Model Details
- Model Type: XGBoost Classifier
- Trained on: UCI Heart Disease Dataset
- Features used:
  - Age, Sex, Chest Pain Type (cp), Resting BP (trestbps), Cholesterol (chol)
  - Fasting Blood Sugar (fbs), Rest ECG, Max HR (thalach), Exercise Angina (exang)
  - ST Depression (oldpeak), Slope, Major Vessels (ca), Thalassemia (thal)

---

## 🖥️ How It Works
1. User inputs 13 medical parameters.
2. Frontend validates input range (e.g., age: 29–77).
3. Sends a POST request to FastAPI backend.
4. XGBoost model returns prediction + probability + risk level.
5. UI shows result, animations, and offers PDF download.

---

## 📂 Project Structure
```
HeartDiseasePrediction/
├── frontend/               # React Web Interface
│   ├── components/         # Form, Results, Charts
│   ├── assets/             # Icons, Backgrounds
│   └── App.js              # Main app logic
├── main.py                 # FastAPI backend
├── models/
│   └── xgboost_heart_model.pkl
├── tests/                  # Test cases and test report
└── README.md               # Project summary (this file)
```

---

## 📌 Parameters Guide
- **cp:** Chest Pain (0–3)
- **restecg:** ECG Results (0–2)
- **thal:** 1 = Normal, 2 = Fixed defect, 3 = Reversible defect
- **ca:** Major vessels (0–4)

---

## 📦 Future Improvements
- 📱 Mobile app version
- 🧠 Health-based tips & early warning system
- 📊 Enhanced charts: user vs. healthy trends
- 🧬 Integrate wearable device data

---

## 📃 License
This is an educational and demonstrative project. Use freely for learning or non-commercial purposes.

---

## 🙏 Acknowledgments
Special thanks to OpenAI's ChatGPT for providing technical guidance, code reviews, and UI ideas throughout this project. ❤️
