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
    allow_origins=["*"],  # Allows all origins
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

# 🚀 Prediction endpoint
@app.post("/predict")
def predict(input_data: HeartDiseaseInput):
    try:
        # Convert input data to NumPy array
        input_array = np.array([[  # ✅ Ensure proper input format
            input_data.age, input_data.sex, input_data.cp, input_data.trestbps,
            input_data.chol, input_data.fbs, input_data.restecg, input_data.thalach,
            input_data.exang, input_data.oldpeak, input_data.slope, input_data.ca, input_data.thal
        ]])

        # ✅ Make prediction
        pred_prob = xgb_model.predict_proba(input_array)[0]

        # 🔥 Improved label mapping logic for better accuracy
        threshold = 0.5
        if pred_prob[0] > threshold:
            label = "Positive (High Risk)"
            probability = float(pred_prob[0])
        else:
            label = "Negative (Low Risk)"
            probability = float(pred_prob[1])

        # ✅ Return result
        return {
            "prediction": label,
            "probability": round(probability, 4)
        }

    except Exception as e:
        # 🔥 Log the full traceback error
        print("🔥 Exception occurred:", traceback.format_exc())
        
        return JSONResponse(
            status_code=500,
            content={
                "error": "Prediction failed",
                "detail": str(e)
            }
        )

# 🛠️ Test endpoint
@app.get("/")
def home():
    return {"message": "Heart Disease Prediction API is running!"}
