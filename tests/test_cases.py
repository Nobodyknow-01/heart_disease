# Test cases for heart disease prediction
test_cases = [
    [65, 1, 0, 145, 233, 1, 2, 150, 0, 2.3, 2, 0, 3],   # Positive
    [50, 0, 1, 122, 244, 0, 0, 162, 0, 1.1, 1, 0, 2],   # Negative
    [68, 1, 0, 155, 290, 0, 2, 140, 0, 2.0, 2, 0, 3],   # Positive
    [42, 0, 2, 138, 180, 0, 0, 152, 1, 1.5, 1, 0, 2],   # Negative
    [53, 1, 0, 130, 197, 1, 2, 152, 1, 1.9, 2, 0, 3],   # Positive
    [39, 0, 2, 138, 220, 0, 1, 152, 0, 0.0, 1, 0, 2],   # Negative
    [55, 1, 1, 140, 217, 1, 0, 111, 1, 5.6, 2, 0, 2],   # Positive
    [46, 0, 0, 120, 184, 0, 0, 150, 0, 0.0, 1, 0, 2],   # Negative
    [67, 1, 0, 152, 212, 0, 2, 150, 0, 0.8, 2, 0, 3],   # Positive
    [48, 0, 2, 130, 275, 0, 0, 139, 0, 0.2, 1, 0, 2],   # Negative
    [64, 1, 0, 140, 335, 0, 2, 158, 0, 0.0, 2, 0, 3],   # Positive
    [47, 0, 1, 108, 243, 0, 0, 152, 0, 0.0, 1, 0, 2],   # Negative
    [61, 1, 0, 134, 234, 0, 2, 145, 0, 2.6, 2, 0, 3],   # Positive
    [44, 0, 2, 110, 197, 0, 0, 177, 0, 0.0, 1, 0, 2],   # Negative
    [70, 1, 0, 150, 237, 1, 2, 145, 0, 3.5, 2, 0, 3],   # Positive
    [41, 0, 1, 112, 180, 0, 0, 172, 0, 0.0, 1, 0, 2],   # Negative
    [51, 1, 0, 135, 298, 0, 2, 120, 1, 1.2, 2, 0, 3],   # Positive
    [49, 0, 2, 118, 149, 0, 0, 126, 0, 0.0, 1, 0, 2]    # Negative
]

# Expected results for the new test cases
expected_results = [
    "Positive", "Negative", "Positive", "Negative", "Positive",
    "Negative", "Positive", "Negative", "Positive", "Negative",
    "Positive", "Negative", "Positive", "Negative", "Positive",
    "Negative", "Positive", "Negative"
]
