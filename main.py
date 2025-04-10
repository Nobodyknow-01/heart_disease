from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
import xgboost as xgb
import os
from fastapi.responses import JSONResponse
import traceback

# ✅ Load the XGBoost model using platform-independent path handling
model_path = os.path.join("Models", "xgboost_heart_model.pkl")
xgb_model = joblib.load(model_path)

# ✅ Initialize FastAPI app
app = FastAPI()

# 🔥 Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # update with frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🩺 Define input schema
class HeartDiseaseInput(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

# 📊 Define feature names
FEATURE_COLUMNS = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
    'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
]

# 🚀 Prediction endpoint
@app.post("/predict")
def predict(input_data: HeartDiseaseInput):
    try:
        input_array = np.array([[
            input_data.age, input_data.sex, input_data.cp, input_data.trestbps,
            input_data.chol, input_data.fbs, input_data.restecg, input_data.thalach,
            input_data.exang, input_data.oldpeak, input_data.slope, input_data.ca, input_data.thal
        ]])

        pred_prob = xgb_model.predict_proba(input_array)[0]
        threshold = 0.5

        if pred_prob[0] > threshold:
            label = "Positive (High Risk)"
            probability = float(pred_prob[0])
            risk = "high"
        else:
            label = "Negative (Low Risk)"
            probability = float(pred_prob[1])
            risk = "low"

        return {
            "prediction": label,
            "probability": round(probability, 4),
            "risk": risk
        }

    except Exception as e:
        print("🔥 Exception occurred:", traceback.format_exc())
        return JSONResponse(
            status_code=500,
            content={"error": "Prediction failed", "detail": str(e)}
        )

# 📈 Feature importance endpoint
@app.get("/feature-importance")
def get_feature_importance():
    importance = xgb_model.feature_importances_
    return {
        "importance": [
            {"feature": feat, "importance": round(float(imp), 4)}
            for feat, imp in zip(FEATURE_COLUMNS, importance)
        ]
    }

# 🛠️ Test endpoint
@app.get("/")
def home():
    return {"message": "Heart Disease Prediction API is running!"}
