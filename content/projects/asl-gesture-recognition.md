---
title: "Real-Time ASL Gesture Recognition System"
slug: "asl-gesture-recognition"
description: "Computer vision application for American Sign Language alphabet recognition using CNN with live webcam detection deployed on Vercel"
category: "Computer Vision"
tags: ["Python", "TensorFlow", "Keras", "CNN", "OpenCV", "React", "Real-Time", "Accessibility"]
date: "2024-10-25"
featured: true
image: "/images/projects/placeholder.svg"
githubUrl: "https://github.com/saaaileen/Computer-Vision-Project"
demoUrl: "https://computer-vision-project-five.vercel.app/"
---

## Problem Statement

Deaf and hard-of-hearing individuals face significant communication barriers when interacting with non-sign language users. Traditional text-based communication solutions are slow and don't capture the fluidity of sign language. There's a need for an accessible, real-time technology that can bridge this gap using AI.

This project develops a **real-time American Sign Language (ASL) recognition system** that uses computer vision and deep learning to classify hand gestures representing the ASL alphabet, making communication more accessible.

## Approach

### Computer Vision Pipeline

**1. Data Collection**
- Used ASL Dataset from Kaggle containing labeled images
- Multiple ASL alphabet classes (A-Z)
- Organized training and validation splits

**2. Data Preprocessing**
- **Image resizing**: Standardized input dimensions
- **Normalization**: Scaled pixel values to [0,1]
- **Data augmentation**: Rotation, flip, zoom for robustness
- Improved model generalization across hand positions and lighting

**3. CNN Architecture**

Built a Convolutional Neural Network optimized for gesture classification:

```
Input Image → Conv Layers → Max Pooling → Conv Layers → 
Max Pooling → Flatten → Dense Layers → Dropout → 
Softmax (26 classes)
```

**Model Components:**
- **Convolutional layers**: Extract spatial features from hand gestures
- **Max pooling**: Reduce spatial dimensions, improve invariance
- **Fully connected layers**: Combine features for classification
- **Dropout regularization**: Prevent overfitting
- **Softmax activation**: Multi-class probability distribution

**4. Real-Time Detection**
- **React frontend**: Clean, responsive web interface
- **Webcam integration**: Live video feed capture
- **Backend API**: Model inference service
- **Prediction smoothing**: Reduces noise in real-time predictions

## Technologies

### Machine Learning Stack
- **Python** - Core programming language
- **TensorFlow/Keras** - Deep learning framework
- **OpenCV** - Image processing and webcam capture
- **NumPy** - Numerical computing
- **Scikit-learn** - Model evaluation metrics

### Web Application Stack
- **React** - Frontend framework
- **Vercel** - Deployment platform
- **REST API** - Backend communication
- **WebRTC** - Real-time webcam streaming

## Features

### Real-Time Recognition

✅ **Live webcam detection** - Instant gesture classification  
✅ **Low-latency inference** - Sub-100ms predictions  
✅ **Visual feedback** - Clear prediction display  
✅ **Backend status indicator** - Connection monitoring  
✅ **Noise filtering** - Smooth predictions without jitter  

### User Interface

- **Central webcam view** - Focused gesture capture area
- **Latest prediction display** - Current detected letter
- **Backend health check** - Visual connection status
- **Responsive design** - Works on desktop and mobile
- **Minimal UI** - Clean, distraction-free interface

### Model Capabilities

- **26-class classification** - Full ASL alphabet (A-Z)
- **Position invariance** - Works with different hand positions
- **Lighting robustness** - Functions across lighting conditions
- **Real-time performance** - Continuous gesture stream processing

## Results

### Model Performance

**Validation Metrics:**
- Strong classification accuracy on held-out test data
- Low loss curves indicating good convergence
- Confusion matrix analysis for per-class performance
- Robust performance across different hand sizes and skin tones

### System Performance

- **Inference Speed**: ~50-100ms per frame
- **Frame Rate**: 10-20 FPS (sufficient for gesture recognition)
- **Latency**: End-to-end <200ms (webcam → prediction → display)
- **Uptime**: 99%+ (Vercel deployment)

### User Experience

- **Intuitive interface** - No training required to use
- **Immediate feedback** - See predictions in real-time
- **Accessibility focus** - Designed for actual communication needs
- **Web-based** - No installation, works in browser

## Applications

### Communication Support
- **Learning tool** - Help people learn ASL alphabet
- **Communication aid** - Assist deaf individuals in emergencies
- **Educational platform** - Interactive ASL teaching

### Accessibility
- **Public spaces** - Airports, hospitals, government offices
- **Customer service** - Enable ASL communication at counters
- **Emergency services** - Quick communication in urgent situations

### Research & Development
- **Baseline for advanced systems** - Foundation for sentence-level recognition
- **Dataset validation** - Testing gesture recognition techniques
- **Human-computer interaction** - Novel interface paradigm

## Challenges & Solutions

### Challenge 1: Real-Time Performance

Balancing model accuracy with inference speed for live detection.

**Solution:**  
- Optimized CNN architecture for speed
- Reduced input resolution without sacrificing accuracy
- Implemented prediction smoothing to reduce jitter
- Used efficient backend API with caching

### Challenge 2: Lighting Variations

Hand gestures look different under various lighting conditions.

**Solution:**  
- Extensive data augmentation during training
- Brightness/contrast adjustments
- Normalized preprocessing pipeline
- Tested across diverse lighting scenarios

### Challenge 3: Hand Position Variability

Users naturally vary hand position, distance, and angle.

**Solution:**  
- Data augmentation with rotation, zoom, translation
- Trained on diverse hand positions
- Max pooling for translation invariance
- Guidance in UI for optimal hand positioning

### Challenge 4: Background Noise

Cluttered backgrounds can confuse the model.

**Solution:**  
- Trained on varied backgrounds
- Added dropout regularization
- UI guidance to keep webcam central
- Potential future enhancement: background segmentation

## Team Collaboration

This project was developed collaboratively by a team of 7 contributors:

**Team Members:**
- **Sisilia Annabel Aileen** - Team Lead
- **Stella Budi Sugianto** - ML Engineer
- **Christina Angela Jodana** - Data Processing
- **Alvin Lawrence** - Model Training
- **Nihal Singh** - Backend Development
- **Nicholas Leonid** - Frontend Development
- **Vincent Christian Atmadjaya** - Model Architecture & Deployment

**My Contributions:**
- Designed and optimized CNN architecture
- Implemented model training pipeline with TensorFlow
- Evaluated performance using confusion matrices
- Assisted with Vercel deployment and API integration
- Conducted testing and validation

## Technical Implementation

### Model Training Process

```python
# Conceptual training pipeline
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Dropout, Flatten

model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(64,64,3)),
    MaxPooling2D(2,2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(26, activation='softmax')  # 26 ASL letters
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)
```

### Real-Time Inference

```python
# Backend API endpoint
@app.route('/predict', methods=['POST'])
def predict():
    image = preprocess(request.files['image'])
    prediction = model.predict(image)
    letter = decode_prediction(prediction)
    return jsonify({'letter': letter, 'confidence': float(max(prediction))})
```

## Live Demo

**Try it now:** [ASL Recognition App](https://computer-vision-project-five.vercel.app/)

**How to use:**
1. Allow webcam access when prompted
2. Position your hand centrally in the frame
3. Form ASL alphabet gestures
4. See instant letter predictions
5. Check backend connection status

## Source Code

[View on GitHub](https://github.com/saaaileen/Computer-Vision-Project)

## Repository Structure

```
Computer-Vision-Project/
├── dataset/           # ASL image data
├── models/            # Trained model checkpoints
├── notebooks/         # Jupyter notebooks for experiments
├── frontend/          # React application
├── backend/           # API server
├── train.py           # Model training script
├── predict.py         # Inference script
├── requirements.txt   # Python dependencies
└── README.md          # Documentation
```

## Future Improvements

### Short-Term Enhancements
- **Sentence-level recognition** - Recognize full words and phrases
- **Confidence threshold** - Only show high-confidence predictions
- **Multi-hand detection** - Support two-handed ASL signs
- **Performance metrics display** - Show FPS and latency stats

### Long-Term Vision
- **Advanced architectures** - Transfer learning with ResNet, MobileNet, EfficientNet
- **Transformer-based models** - Attention mechanisms for temporal sequences
- **Mobile application** - Native iOS/Android apps with offline capability
- **Dataset expansion** - Include more diverse hand types, skin tones, ages
- **Additional sign languages** - BSL, JSL, LSF support
- **Grammar and syntax** - Full sentence structure recognition
- **AR integration** - Overlay translations in augmented reality

## Educational Impact

This project demonstrates:
- **Practical computer vision** - Real-world accessibility application
- **End-to-end ML pipeline** - Data → training → deployment
- **Collaborative development** - Team-based software engineering
- **Social impact** - Technology for underserved communities
- **Full-stack integration** - ML model + web application

## References

- **Dataset:** [ASL Dataset on Kaggle](https://www.kaggle.com/datasets/grassknoted/asl-alphabet)
- **TensorFlow Documentation:** [tensorflow.org](https://www.tensorflow.org)
- **OpenCV Documentation:** [docs.opencv.org](https://docs.opencv.org)

---

**Acknowledgments:** This project was developed as part of a Computer Vision course, demonstrating the practical application of deep learning for social good and accessibility.
