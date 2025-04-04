import axios from "axios";

const BASE_URL = "https://heart-disease-z6ru.onrender.com"; // Your FastAPI server

export const predictHeartDisease = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict`, data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
