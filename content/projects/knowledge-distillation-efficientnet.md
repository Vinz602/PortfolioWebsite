---
title: "Knowledge Distillation for Food Image Classification"
slug: "knowledge-distillation-efficientnet"
description: "Optimizing EfficientNet-B0 through knowledge distillation to achieve full-model performance on UECFOOD256 dataset with 57.46% top-1 accuracy"
category: "Deep Learning"
tags: ["Python", "PyTorch", "Knowledge Distillation", "EfficientNet", "Computer Vision", "Research"]
date: "2026-01-01"
featured: true
image: "/images/projects/placeholder.svg"
githubUrl: "https://github.com/Vinz602/KnowledgeDistillationOnEfficientNet"
---

## Problem Statement

Deep learning models for image classification often face a trade-off between accuracy and computational efficiency. Larger models like EfficientNet-B3 achieve higher accuracy but require more parameters and inference time, making them impractical for resource-constrained applications. This project addresses the challenge of transferring knowledge from a larger teacher model to a smaller student model without adding parameters.

## Approach

### Methodology

This research implements **intra-family knowledge distillation** where EfficientNet-B3 (teacher) distills knowledge to EfficientNet-B0 (student) on the UECFOOD256 dataset (256-way food classification). The key insight is that both models share the same MBConv backbone architecture, enabling effective knowledge transfer.

### Three-Stage Training Pipeline

**Stage 1: Feature Extraction Setup**
- Load ImageNet-pretrained EfficientNet-B0 and B3
- Freeze all layers except features[-1] and classifier head
- Establish baseline models

**Stage 2: Independent Fine-Tuning**
- Train both models independently on UECFOOD256 with hard labels
- B0 becomes the baseline, B3 becomes the teacher
- Evaluate performance gap between models

**Stage 3: Knowledge Distillation**
- Retrain B0 from Stage 2 checkpoint using temperature-scaled soft labels from frozen B3 teacher
- Temperature T=3, α=0.5 (soft label weight)
- Produces enhanced B0* model

### Experimental Controls

To isolate the distillation benefit, two additional baselines were tested:

1. **Label Smoothing (ε=0.1)** - Tests whether generic soft-target regularization explains the gain
2. **FitNets Feature Distillation** - Tests intermediate-feature supervision vs logit-level supervision

## Technologies

- **Python** - Primary programming language
- **PyTorch** - Deep learning framework
- **EfficientNet** - Base architecture for teacher and student
- **Google Colab** - Training environment with A100 GPU
- **UECFOOD256 Dataset** - 256 food categories
- **Knowledge Distillation** - Model compression technique
- **Temperature Scaling** - Soft label generation

## Results

### Performance Metrics

Evaluated on held-out validation split (256-way classification):

| Model | Top-1 Acc | Top-5 Acc | Precision | F1 Score |
|-------|-----------|-----------|-----------|----------|
| EfficientNet-B0 (baseline) | 56.25% | 83.52% | 56.88% | 56.04% |
| + Label Smoothing | 54.35% | 81.61% | 55.21% | 54.20% |
| + FitNets Feature Distillation | 55.94% | 83.10% | 56.63% | 55.70% |
| **+ Soft-Label KD (B0*, ours)** | **57.46%** | **84.48%** | **58.05%** | **56.93%** |
| EfficientNet-B3 (teacher) | 52.74% | 80.70% | 52.75% | 52.14% |

### Key Findings

1. **Soft-label KD outperforms** all controls and the baseline, improving top-1 accuracy by **1.21 percentage points**
2. **Label smoothing underperforms** the baseline, indicating the gain comes specifically from the teacher's learned inter-class structure, not soft targets in general
3. **Student surpasses teacher** - B0* outperforms its own B3 teacher, a documented phenomenon where the student benefits from both soft supervision and hard-label loss simultaneously
4. **Statistical significance** confirmed through McNemar's test and bootstrap confidence intervals

### Model Efficiency

- **Zero parameter increase** - B0* maintains the same model size as baseline B0
- **Improved accuracy** without computational cost
- **Practical deployment** - Lightweight model suitable for edge devices

## Challenges & Solutions

### Challenge 1: Reproducibility

Initial notebooks used unseeded random splits, making results non-reproducible.

**Solution:** Created `locked_split_manifest.json` to fix train/val split across all experiments, ensuring identical held-out sets for every run.

### Challenge 2: Imbalanced Dataset

UECFOOD256 has varying numbers of images per food category.

**Solution:** Used weighted precision and F1 scores alongside accuracy to provide fairer evaluation across all classes.

### Challenge 3: GPU Memory Constraints

Training multiple EfficientNet models simultaneously required careful resource management.

**Solution:** Implemented checkpointing every epoch to Drive with automatic resume capability, allowing interrupted training to continue seamlessly.

## Research Impact

This work will be presented at **ICORIS 2026** (International Conference on Research and Innovation in Science):

**Citation:**
```
Sugianto, S. B., Putra, A. K., Aileen, S. A., Iswanto, I. A., 
& Atmadjaya, V. C. (2026). Knowledge Distillation for Lightweight 
Food Image Classification on UECFOOD256: Optimizing EfficientNet-B0 
Toward Full-Model Performance. ICORIS 2026.
```

## Repository Structure

```
├── Rebuild_B0_B3_Baselines.ipynb           # Stages 1 & 2: Training baselines
├── Stage3_Distillation_and_Baselines.ipynb # KD + controls + profiling
└── README.md
```

## Source Code

[View on GitHub](https://github.com/Vinz602/KnowledgeDistillationOnEfficientNet)

## Future Improvements

- Extend to other EfficientNet pairings (B1→B0, B4→B2)
- Test on additional food datasets (Food-101, VIREO Food-172)
- Implement quantization-aware training for further compression
- Explore temperature scheduling during training
- Deploy optimized model on mobile devices for real-time classification
