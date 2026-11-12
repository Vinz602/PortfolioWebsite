---
title: "Medical X-Ray Disease Classification with ConvNeXt"
slug: "xray-disease-classification"
description: "Deep learning system for automated X-ray classification detecting COVID-19, pneumonia, tuberculosis using ConvNeXt Tiny architecture deployed on Streamlit"
category: "Computer Vision"
tags: ["Python", "PyTorch", "ConvNeXt", "Medical AI", "Streamlit", "Deep Learning", "Healthcare"]
date: "2024-12-01"
featured: true
image: "/images/projects/placeholder.svg"
githubUrl: "https://github.com/Vinz602/AOL_AI"
---

## Problem Statement

Manual interpretation of chest X-rays for respiratory diseases is time-consuming and requires specialized medical expertise. In resource-constrained healthcare settings, delayed diagnosis can worsen patient outcomes. With the rise of COVID-19, there's an urgent need for automated screening tools that can quickly identify multiple respiratory conditions from X-ray images.

This project develops an AI-powered diagnostic assistant that classifies chest X-rays into **5 categories**: Bacterial Pneumonia, Viral Pneumonia, COVID-19, Tuberculosis, and Normal, providing instant preliminary screening to support medical professionals.

## Approach

### Model Architecture

**ConvNeXt Tiny** - Modern CNN architecture combining efficiency with high accuracy:
- Based on Vision Transformer insights applied to convolutional networks
- Fewer parameters than traditional ResNets
- Better feature learning through depthwise convolutions
- Optimized for both accuracy and inference speed

**Transfer Learning Pipeline:**
1. Start with ImageNet-pretrained ConvNeXt Tiny
2. Replace classifier head for 5-class medical classification
3. Fine-tune on chest X-ray dataset
4. Apply data augmentation to prevent overfitting

### Technical Implementation

**Data Preprocessing:**
```python
- Resize: 257x257 (15% larger than target)
- Center crop: 224x224
- Normalize: ImageNet statistics
- Augmentation: Random flips, rotations, color jittering
```

**Training Strategy:**
- **Optimizer**: AdamW with weight decay
- **Loss**: Cross-entropy loss
- **Mixed precision training**: bfloat16/float32 for faster training
- **Hardware**: GPU acceleration (CUDA when available)
- **Checkpointing**: Save best model based on validation accuracy

**Deployment:**
- Model hosted on **Hugging Face Hub** for easy loading
- Streamlit web interface for real-time inference
- Automatic health recommendations based on predictions
- Docker containerization for reproducible deployment

## Technologies

- **PyTorch** - Deep learning framework
- **ConvNeXt** - State-of-the-art CNN architecture
- **torchvision** - Computer vision utilities
- **Streamlit** - Web application framework
- **Hugging Face Hub** - Model hosting and versioning
- **PIL (Pillow)** - Image processing
- **Docker** - Containerization
- **Mixed Precision Training** - Faster GPU training
- **Python 3.9+** - Programming language

## Features

### 5-Class Classification

| Disease | Description |
|---------|-------------|
| **Bacterial Pneumonia** | Requires immediate antibiotic treatment |
| **Viral Pneumonia** | Managed with rest and symptomatic care |
| **COVID-19** | Requires isolation and medical monitoring |
| **Tuberculosis** | Needs full course antibiotic treatment |
| **Normal** | No disease detected |

### Intelligent Health Recommendations

The system provides **actionable medical advice** based on predictions:

**COVID-19 Detection:**
- ✅ Isolate immediately and contact healthcare facility
- ✅ Wear mask around others, maintain 1-meter distance
- ✅ Frequent hand washing with soap or sanitizer
- ✅ Avoid touching face, especially eyes, nose, mouth

**Bacterial Pneumonia:**
- ⚠️ **Urgent medical evaluation required** for antibiotics
- ✅ Adequate rest and hydration
- ✅ Pain/fever medication as needed

**Tuberculosis:**
- ⚠️ Immediate doctor consultation for proper treatment
- ✅ Complete full medication course as prescribed
- ✅ Regular check-ups to monitor progress

### User Interface

**Streamlit Web App:**
- Simple file upload interface (JPG, JPEG, PNG)
- Real-time image preview
- One-click prediction with loading indicator
- Confidence scores for all classes
- Disease-specific health recommendations

## Results

### Model Performance

- **Inference Speed**: ~500ms per image on CPU
- **GPU Acceleration**: ~50ms per image on CUDA
- **Model Size**: ~28MB (ConvNeXt Tiny)
- **Input Resolution**: 224×224 RGB

### Key Features Delivered

✅ **Multi-class disease detection** - Identifies 5 conditions  
✅ **High confidence predictions** - Probability scores provided  
✅ **Real-time inference** - Sub-second predictions  
✅ **Actionable recommendations** - Medical guidance for each condition  
✅ **Web-based deployment** - Accessible via browser  
✅ **Mobile-friendly** - Responsive Streamlit UI  

### Clinical Utility

- **Screening tool** for preliminary diagnosis
- **Triage support** in high-volume settings
- **Educational resource** for medical students
- **Remote diagnosis** in underserved areas
- **Second opinion** for radiologists

## Challenges & Solutions

### Challenge 1: Class Imbalance

Medical datasets often have unequal representation across disease categories.

**Solution:**  
- Applied **weighted sampling** during training
- Used **data augmentation** to synthetically balance classes
- Monitored per-class accuracy to ensure no category was underrepresented

### Challenge 2: Overfitting on Small Dataset

Medical imaging datasets are often limited in size compared to natural images.

**Solution:**  
- **Transfer learning** from ImageNet-pretrained weights
- **Heavy data augmentation** (flips, rotations, color jittering)
- **Early stopping** based on validation performance
- **Dropout** and **weight decay** for regularization

### Challenge 3: Model Deployment Size

Initial model was too large for free-tier cloud hosting.

**Solution:**  
- Switched to **ConvNeXt Tiny** (lighter than ConvNeXt Base)
- Hosted model weights on **Hugging Face Hub** (free unlimited storage)
- Streamlit app downloads weights on first run, caching locally
- Reduced app size by excluding training dependencies

### Challenge 4: Mixed Precision Compatibility

bfloat16 not supported on all hardware.

**Solution:**  
```python
dtype = torch.bfloat16 if Device.type == "cuda" else torch.float32
```
Automatically falls back to float32 on CPU, ensuring compatibility.

## Technical Highlights

### Model Loading Strategy

```python
# Efficient model loading from Hugging Face Hub
def setup_model(repo_id, filename, local_path):
    downloaded_path = hf_hub_download(
        repo_id=repo_id,
        filename=filename,
        local_dir=os.path.dirname(local_path)
    )
    model = load_trained_model(downloaded_path)
    return model
```

Benefits:
- ✅ One-time download, cached locally
- ✅ Version control through Hugging Face
- ✅ No need to commit large model files to Git
- ✅ Easy model updates by pushing to HF Hub

### Inference Pipeline

```python
@torch.no_grad()
def predict_one(img_pil):
    img = eval_tf(img_pil).unsqueeze(0).to(Device)
    logits = model(img)
    probs = torch.softmax(logits, dim=1)[0].cpu().numpy()
    pred_class = class_names[probs.argmax()]
    confidence = float(probs.max())
    return pred_class, confidence, probs
```

Features:
- `@torch.no_grad()` - No gradient computation (faster inference)
- Automatic device placement (CPU/GPU)
- Softmax for probability distribution
- Returns class name, confidence, and all probabilities

## Architecture Details

### ConvNeXt Modifications

```python
model = convnext_tiny(weights="IMAGENET1K_V1")
in_features = model.classifier[2].in_features
model.classifier[2] = nn.Linear(in_features, 5)  # 5 disease classes
```

Changes from base model:
- Replaced final classifier layer (1000 → 5 classes)
- Kept feature extraction layers frozen initially
- Fine-tuned entire network in later stages

## Running Locally

To run the application:

```bash
git clone https://github.com/Vinz602/AOL_AI.git
cd AOL_AI/AOL
pip install -r requirements.txt
streamlit run streamlit_app.py
```

**How to use:**
1. Upload a chest X-ray image (JPG, PNG)
2. Click "Predict"
3. View classification result and confidence
4. Read disease-specific health recommendations

## Source Code

[View on GitHub](https://github.com/Vinz602/AOL_AI)

## Repository Structure

```
AOL_AI/
├── AOL/
│   ├── streamlit_app.py          # Streamlit web interface
│   ├── predict.py                # Inference logic
│   ├── train_convnext_tiny.ipynb # Training notebook
│   ├── requirements.txt          # Python dependencies
│   └── Dockerfile                # Container configuration
└── README.md
```

## Future Improvements

- **Explainability**: Integrate Grad-CAM or SHAP to highlight suspicious regions in X-rays
- **Multi-view support**: Accept lateral and PA views simultaneously
- **Uncertainty estimation**: Use Monte Carlo dropout for confidence intervals
- **Ensemble models**: Combine ConvNeXt with other architectures for better accuracy
- **Report generation**: Auto-generate radiologist-style reports
- **DICOM support**: Handle medical imaging standard format directly
- **Batch processing**: Upload multiple X-rays at once
- **API endpoint**: REST API for integration with hospital systems
- **Mobile app**: Native iOS/Android application
- **Performance benchmarking**: Compare against radiologist accuracy
- **Additional diseases**: Expand to lung cancer, emphysema, etc.
