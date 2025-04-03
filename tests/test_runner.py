import numpy as np
import time
import joblib
import os
from test_cases import test_cases, expected_results

# ✅ Load the model using a relative path (for better portability)
model_path = os.path.join("models", "xgboost_heart_model.pkl")
model = joblib.load(model_path)

# ✅ Convert test cases to numpy array for prediction
test_cases_np = np.array(test_cases)

# ✅ Make predictions
start_time = time.time()
predictions = model.predict_proba(test_cases_np)  # ✅ Using predict_proba()
end_time = time.time()

def interpret_prediction(prob, threshold=0.5):
    """
    Interpret the prediction based on class probabilities.
    - prob[0] → "Positive (High Risk)"
    - prob[1] → "Negative (Low Risk)"
    """
    if prob[0] > threshold:
        return "Positive", float(prob[0])  # High Risk
    else:
        return "Negative", float(prob[1])  # Low Risk

# ✅ Initialize counters
passed = 0
failed = 0
report_lines = []

# ✅ Evaluate each test case
for i, prob in enumerate(predictions):
    predicted, probability = interpret_prediction(prob)
    expected = expected_results[i]
    result = "PASS" if predicted == expected else "FAIL"
    
    if result == "PASS":
        passed += 1
    else:
        failed += 1
    
    report_line = (f"Test Case {i + 1}: Expected: {expected}, Got: {predicted} "
                   f"({probability:.4f}), Result: {result}")
    report_lines.append(report_line)

# ✅ Add summary details
accuracy = (passed / len(test_cases)) * 100
report_lines.append("\n--- TEST SUMMARY ---")
report_lines.append(f"Total Tests: {len(test_cases)}")
report_lines.append(f"Passed: {passed}")
report_lines.append(f"Failed: {failed}")
report_lines.append(f"Accuracy: {accuracy:.2f}%")
report_lines.append(f"Execution Time: {end_time - start_time:.4f} seconds")

# ✅ Print results and write to file
report_output = "\n".join(report_lines)
print(report_output)

# ✅ Ensure 'tests' directory exists
output_dir = "tests"
os.makedirs(output_dir, exist_ok=True)

# ✅ Save report to file
output_path = os.path.join(output_dir, "test_report.txt")
with open(output_path, "w") as f:
    f.write(report_output)

print(f"\n🔥 Test report saved to {output_path}")
