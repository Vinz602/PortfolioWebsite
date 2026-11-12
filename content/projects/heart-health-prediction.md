---
title: "Heart Disease Prediction System"
slug: "heart-health-prediction"
description: "Machine learning models for diagnosing heart disease with comparative analysis of Random Forest, SVM, Decision Tree, and Logistic Regression"
category: "Data Analysis"
tags: ["Python", "Scikit-learn", "Logistic Regression", "Random Forest", "Healthcare", "Classification"]
date: "2024-07-10"
featured: false
image: "/images/projects/placeholder.svg"
githubUrl: "https://github.com/Vinz602/HeartHealthPrediction"
---

## Problem Statement

Heart disease is one of the leading causes of death worldwide. Early prediction and diagnosis can significantly improve patient outcomes and reduce mortality rates. This project develops a machine learning system to predict the presence of heart disease in patients based on 13 clinical features.

The goal is to identify which machine learning algorithm provides the best accuracy and reliability for heart disease prediction, enabling medical professionals to make better-informed decisions.

## Dataset

**Source:** UCI Heart Disease Dataset

| Property | Value |
|----------|-------|
| Samples | 303 patients |
| Features | 13 clinical attributes |
| Target | Heart disease presence (binary) |
| Data types | Categorical and continuous |
| Missing values | 2 rows (dropped) |

### Key Features

- **Age** - Patient age in years
- **Sex** - Male/Female
- **Chest Pain Type** - 4 categories
- **Resting Blood Pressure** - mm Hg
- **Serum Cholesterol** - mg/dl
- **Fasting Blood Sugar** - > 120 mg/dl
- **Resting ECG Results** - Normal/Abnormal
- **Max Heart Rate** - Beats per minute
- **Exercise Induced Angina** - Yes/No
- **ST Depression** - Exercise vs rest
- **Slope** - Peak exercise ST segment
- **Number of Major Vessels** - Colored by fluoroscopy (0-3)
- **Thalassemia** - Normal/Fixed/Reversible defect

## Approach

### Data Preprocessing

1. **Data Cleaning:**
   - Removed 2 rows with null values using `dropna()`
   - Verified no remaining missing values
   - Checked for duplicate entries

2. **Exploratory Data Analysis:**
   - Created correlation matrix to identify most dependent variables
   - **Age** found to be most correlated with target
   - Visualized class distribution (heart disease vs no disease)
   - Analyzed feature distributions and relationships

3. **Data Visualization:**
   - Plotted correlation heatmap
   - Created target variable distribution chart
   - Analyzed age distribution by disease status

### Model Selection & Training

Implemented and compared **4 machine learning algorithms:**

1. **Logistic Regression** - Linear model for binary classification
2. **Random Forest** - Ensemble of decision trees
3. **Support Vector Machine (SVM)** - Maximum margin classifier
4. **Decision Tree** - Single tree-based classifier

Each model was:
- Trained on the same train/test split
- Evaluated using cross-validation
- Assessed for accuracy and consistency

## Technologies

- **Python** - Programming language
- **Pandas** - Data manipulation
- **NumPy** - Numerical operations
- **Scikit-learn** - Machine learning library
- **Matplotlib** - Data visualization
- **Seaborn** - Statistical plotting
- **Jupyter Notebook** - Development environment

## Results

### Model Performance

**Cross-Validation Results:**

After rigorous cross-validation testing, results showed:

| Model | Strengths | Considerations |
|-------|-----------|----------------|
| **Logistic Regression** | **Best for this problem** | Consistent performance, interpretable |
| Random Forest | Good accuracy | Some variance in CV |
| SVM | High accuracy | Computationally intensive |
| Decision Tree | Fast training | Prone to overfitting |

### Key Findings

1. **Logistic Regression emerged as optimal** - Best balance of accuracy, consistency, and interpretability
2. **Age is strongest predictor** - Highest correlation with heart disease presence
3. **All models achieved >80% accuracy** - Dataset has clear patterns ML can learn
4. **Cross-validation variance matters** - LR showed most stable results across folds

### Clinical Relevance

The Logistic Regression model's interpretability is crucial for medical applications:
- **Transparent predictions** - Can explain why model flagged a patient
- **Feature importance** - Identifies which factors contribute most
- **Confidence scores** - Provides probability estimates, not just binary outputs
- **Regulatory compliance** - Explainable AI important for healthcare

## Challenges & Solutions

### Challenge 1: Small Dataset

Only 303 samples - risk of overfitting with complex models.

**Solution:**  
- Used cross-validation to ensure generalization
- Compared simple (Logistic Regression) vs complex (Random Forest) models
- Found simpler model more reliable on small data

### Challenge 2: Imbalanced Features

Some features had very different scales (age in years, cholesterol in mg/dl).

**Solution:**  
- Scikit-learn's models handle feature scaling internally
- For models sensitive to scale (SVM), ensured proper normalization
- Compared normalized vs unnormalized to verify impact

### Challenge 3: Model Selection Criteria

Accuracy alone insufficient for medical applications.

**Solution:**  
- Evaluated consistency through cross-validation
- Considered interpretability as key criterion
- Analyzed both sensitivity and specificity
- Chose model balancing all factors, not just accuracy

### Challenge 4: Missing Data

Two rows contained null values.

**Solution:**  
- With only 2 missing rows out of 303, safe to drop
- Verified removal didn't bias class distribution
- Alternative would be imputation, but not needed here

## Repository Structure

```
HeartHealthPrediction/
├── Heart Health.ipynb    # Complete analysis notebook
├── heart.csv             # Dataset
└── README.md             # Documentation
```

## Installation & Usage

```bash
# Install Anaconda Distribution
# Install Jupyter Notebook

# Copy files to working directory
# C:\Users\xyz\Heart Health.ipynb
# C:\Users\xyz\heart.csv

# Run Jupyter Notebook
jupyter notebook

# Open Heart Health.ipynb
# Update read_csv() path to your file location
```

## Source Code

[View on GitHub](https://github.com/Vinz602/HeartHealthPrediction)

## Future Improvements

- **Larger dataset**: Incorporate more patient records for better generalization
- **Feature engineering**: Create interaction features (e.g., age × cholesterol)
- **Ensemble methods**: Combine multiple models for improved accuracy
- **Deep learning**: Experiment with neural networks on larger datasets
- **Real-time prediction**: Deploy as web API for clinical use
- **Explainability tools**: Integrate SHAP or LIME for model interpretation
- **Additional validation**: Test on external datasets from different hospitals
- **Cost-sensitive learning**: Weigh false negatives more heavily (missing disease worse than false alarm)
