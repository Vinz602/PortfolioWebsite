---
title: "Credit Default Prediction System"
slug: "credit-default-prediction"
description: "Gradient-boosted classifier predicting 90+ day delinquency with 86.81% ROC-AUC on highly imbalanced credit dataset"
category: "Data Analysis"
tags: ["Python", "Scikit-learn", "Gradient Boosting", "Imbalanced Learning", "Feature Engineering", "Risk Analysis"]
date: "2024-09-15"
featured: true
image: "/images/projects/placeholder.svg"
githubUrl: "https://github.com/Vinz602/DS-CreditDefaultPrediction"
---

## Problem Statement

Lenders need accurate risk assessment tools to predict whether borrowers will default on their loans. Traditional accuracy metrics are misleading in credit scoring because defaults are rare events (~6.7% of borrowers). A model that always predicts "no default" achieves 93.3% accuracy while catching zero actual defaulters - completely useless for risk management.

This project builds a machine learning system to predict **serious delinquency** (90+ days past due within 2 years) using the "Give Me Some Credit" Kaggle dataset, evaluated with metrics appropriate for highly imbalanced classes.

## Dataset

**Source:** Kaggle "Give Me Some Credit" competition

| Property | Value |
|----------|-------|
| Training samples | 150,000 |
| Test samples | 101,503 (unlabeled) |
| Target variable | SeriousDlqin2yrs (1 = default) |
| Positive class | 10,026 defaults (6.68%) |
| Imbalance ratio | 14:1 (non-default:default) |
| Baseline accuracy | 93.32% (always predict 0) |

### Features (10 inputs)

| Feature | Description |
|---------|-------------|
| RevolvingUtilizationOfUnsecuredLines | Credit utilization ratio |
| age | Borrower age in years |
| NumberOfTime30-59DaysPastDueNotWorse | Times 30-59 days late (last 2 years) |
| NumberOfTime60-89DaysPastDueNotWorse | Times 60-89 days late (last 2 years) |
| NumberOfTimes90DaysLate | Times 90+ days late |
| DebtRatio | Monthly debt payments / monthly income |
| MonthlyIncome | Monthly income (~20% missing) |
| NumberOfOpenCreditLinesAndLoans | Open credit lines |
| NumberRealEstateLoansOrLines | Mortgage loans |
| NumberOfDependents | Number of dependents (~2.6% missing) |

## Approach

### 1. Data Cleaning & Feature Engineering

| Issue | Treatment |
|-------|-----------|
| Late-payment counts contain sentinel values (96, 98) | Replaced with NaN |
| Age contains 0 values | Values < 18 set to NaN |
| RevolvingUtilization has extreme outliers (max 50,708) | Clipped to [0, 2] |
| NumberOfDependents missing | Filled with 0 |
| MonthlyIncome missing | Kept as NaN + added binary feature `income_missing` |

All cleaning wrapped in `make_features(df)` function ensuring identical train/test treatment.

### 2. Model Selection

**HistGradientBoostingClassifier** (scikit-learn) chosen because:
- Handles NaN natively (no imputation needed)
- Excellent performance on tabular data
- Built-in early stopping
- L2 regularization for generalization

**Hyperparameters:**
```python
HistGradientBoostingClassifier(
    learning_rate=0.05,
    max_iter=500,
    max_leaf_nodes=15,
    min_samples_leaf=50,
    l2_regularization=1.0,
    early_stopping=True,
    validation_fraction=0.15,
    n_iter_no_change=30,
    random_state=42
)
```

### 3. Evaluation Strategy

Given 14:1 imbalance, primary metrics are:
- **ROC-AUC**: Measures ranking quality across all thresholds
- **PR-AUC**: More honest metric for rare events (average precision)
- **Precision-Recall trade-off**: Threshold can be tuned based on business costs

## Technologies

- **Python 3.10+** - Programming language
- **Scikit-learn** - Machine learning library
- **HistGradientBoosting** - Gradient boosted decision trees
- **Pandas** - Data manipulation
- **NumPy** - Numerical operations
- **Matplotlib** - Visualization
- **Seaborn** - Statistical plotting
- **KaggleHub** - Dataset downloading
- **Jupyter Notebook** - Development environment

## Results

### Model Performance

**Validation Set** (30,000 samples, 2,005 defaults):

| Metric | Value |
|--------|-------|
| **ROC-AUC** | **0.8681** |
| **PR-AUC** | **0.4066** |
| No-skill PR baseline | 0.0668 |

### Classification Report (at 0.5 threshold)

| Class | Precision | Recall | F1 | Support |
|-------|-----------|--------|----|---------| 
| No default (0) | 0.94 | 0.99 | 0.97 | 27,995 |
| Default (1) | 0.61 | 0.19 | 0.29 | 2,005 |

### Interpretation

- **Strong ranking ability**: ROC-AUC of 0.87 indicates the model ranks borrowers well
- **PR-AUC improvement**: 0.41 vs baseline 0.067 shows genuine predictive power beyond random
- **Threshold tuning opportunity**: At 0.5 cutoff, model flags only 19% of defaulters but with 61% precision
- **Business decision**: Lower threshold to increase recall (catch more defaults) at cost of more false alarms

The model outputs **probabilities**, allowing business to tune the cutoff based on:
- Cost of missed default (lost principal + interest)
- Cost of rejected good borrower (lost interest revenue)

## Challenges & Solutions

### Challenge 1: Extreme Class Imbalance

Only 1 in 15 borrowers defaults - naive models predict all zeros.

**Solution:**  
- Used ROC-AUC and PR-AUC as primary metrics instead of accuracy
- HistGradientBoosting handles imbalance naturally through loss function
- Preserved class distribution in stratified train/val split

### Challenge 2: Missing Data

20% missing MonthlyIncome, 2.6% missing NumberOfDependents.

**Solution:**  
- HistGradientBoosting handles NaN natively (treats as separate category)
- Created `income_missing` binary feature (missingness itself can be informative)
- No imputation needed, preserving information about data quality

### Challenge 3: Sentinel Values

Late-payment features contained values 96 and 98 (data entry codes, not real counts).

**Solution:**  
- Identified through EDA (impossible to have 96 late payments in 2 years)
- Replaced with NaN, letting model handle appropriately
- Prevented model from learning spurious patterns

### Challenge 4: Feature Outliers

RevolvingUtilization should be ratio (0-1) but had values >50,000.

**Solution:**  
- Analyzed distribution, found extreme right tail
- Clipped to [0, 2] based on domain knowledge (>200% utilization is data error)
- Preserved genuine high-utilization cases while removing nonsense values

## Repository Structure

```
DS-CreditDefaultPrediction/
├── FraudDetection.ipynb   # Complete workflow notebook
└── README.md              # Documentation
```

## Source Code

[View on GitHub](https://github.com/Vinz602/DS-CreditDefaultPrediction)

## Future Improvements

- **Threshold optimization**: Maximize F1 or fix target recall using precision-recall curve
- **Cross-validation**: K-fold validation instead of single holdout split
- **Hyperparameter tuning**: Grid search across learning rate, max_depth, etc.
- **Model comparison**: Benchmark against XGBoost, LightGBM, logistic regression
- **Calibration**: Isotonic or Platt scaling for better probability estimates
- **Feature engineering**: Create interaction features (e.g., total late payments, income per dependent)
- **SHAP explainability**: Understand which features drive individual predictions
- **Cost-sensitive learning**: Explicitly incorporate business costs into training
