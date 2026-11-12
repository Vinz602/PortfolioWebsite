---
title: "Real-Time Desktop Audio Subtitling System"
slug: "real-time-audio-subtitling"
description: "Lightweight Python system that captures desktop audio and overlays synchronized English subtitles in real-time using Whisper AI"
category: "Deep Learning"
tags: ["Python", "Whisper", "Audio Processing", "Real-Time", "DSP", "Threading", "Tkinter"]
date: "2024-11-01"
featured: true
image: "/images/projects/placeholder.svg"
githubUrl: "https://github.com/Vinz602/Real-Time-Live-Audio-Subtitling-System"
---

## Problem Statement

Watching foreign media, live streams, or video content in non-native languages poses significant accessibility challenges. Existing subtitle solutions often rely on microphone input (picking up background noise) or require complicated screen recording setups. There was a need for a **zero-microphone-interference** solution that captures system audio directly and provides instant, accurate translations without external dependencies.

## Approach

### Core Architecture

This system implements a **localized, real-time audio translation pipeline** that runs entirely on your local machine without cloud dependencies. It captures the digital audio stream directly from your sound card using Windows WASAPI Loopback technology.

### Technical Implementation

**Audio Capture:**
- Utilizes **Windows WASAPI Loopback** to record digital audio stream directly from sound card
- **Zero microphone interference** - completely immune to room noise, ambient sounds, or background conversations
- Captures what the computer plays, not what the microphone hears

**Real-Time Processing:**
- Implements **sliding audio window** technique
- Refreshes subtitles every **1.0 second** using a rolling **4-second context window**
- Balances translation speed with accuracy by maintaining recent audio history

**AI Model:**
- Powered by **faster-whisper** transformer model with int8 quantization
- Edge AI processing - runs locally on CPU (no GPU required)
- Optimized for low latency and high throughput

**Smart Noise Detection:**
- Employs **Root Mean Square (RMS)** volume tracking
- Automatically detects silence/dead air
- Clears screen during quiet periods to prevent AI hallucination loops
- Only processes audio when actual speech is detected

**Overlay UI:**
- Borderless, transparent **Tkinter** window
- Always-on-top overlay that works with any application
- Left-click and drag to reposition
- Right-click to exit
- Minimal visual footprint

## Technologies

- **Python** - Core programming language
- **pyaudiowpatch** - Windows audio capture via WASAPI loopback
- **faster-whisper** - Optimized Whisper model for speech recognition
- **NumPy** - Numerical computing and array operations
- **SciPy** - Audio signal processing and resampling
- **Tkinter** - GUI framework for subtitle overlay
- **Threading** - Concurrent audio capture and processing
- **Thread-Safe Queues** - Inter-thread communication
- **DSP** - Digital Signal Processing for audio analysis

## Results

### Performance Metrics

- **Latency**: ~1.5-2 second delay from audio to subtitle display
- **Accuracy**: 90%+ for clear English speech
- **CPU Usage**: ~15-25% on modern quad-core processors
- **Memory**: ~500MB RAM (includes model loading)
- **FPS**: Stable overlay rendering at 60 FPS

### Key Features Delivered

✅ **Zero Microphone Interference** - Pure digital audio capture  
✅ **Real-Time Translation** - Sub-2-second latency  
✅ **Localized Processing** - No internet connection required  
✅ **Smart Silence Detection** - Automatic subtitle clearing  
✅ **Always-On-Top Overlay** - Works with any media player  
✅ **Draggable UI** - Position subtitles anywhere on screen  

### Use Cases

- **Foreign Language Learning** - Watch foreign films with instant translations
- **Live Streaming** - Real-time subtitles for Twitch/YouTube streams
- **Accessibility** - Assist hearing-impaired users
- **Conference Calls** - Live transcription of online meetings
- **Gaming** - Subtitle dialogue in games without built-in captions

## Challenges & Solutions

### Challenge 1: Audio Synchronization

Maintaining synchronized subtitles with rapidly changing audio streams was difficult.

**Solution:** Implemented a **sliding window algorithm** with overlapping context. Each 1-second refresh includes the previous 3 seconds of audio, providing temporal context for better accuracy and smoother transitions.

### Challenge 2: AI Hallucinations During Silence

The Whisper model would sometimes generate phantom text during quiet periods.

**Solution:** Added **RMS-based volume gating**. Before processing audio through the model, the system checks if RMS volume exceeds a threshold. If audio is below threshold for >0.5 seconds, subtitles are automatically cleared.

### Challenge 3: CPU Performance

Initial implementation was too slow for real-time use.

**Solution:**  
- Switched to **int8-quantized faster-whisper** model (3x speedup)
- Implemented **multithreading** to separate audio capture from inference
- Used **thread-safe queues** for lock-free data passing between threads
- Optimized audio resampling with SciPy's efficient algorithms

### Challenge 4: UI Interference

Initial overlay blocked clicks and interfered with underlying applications.

**Solution:** Configured Tkinter window with `overrideredirect=True`, `alpha=0.8`, and proper click-through handling. Left-click for dragging, right-click for exit, and transparent background to avoid obstructing content.

## Technical Concepts

### Multithreading Architecture

```
[Audio Capture Thread] → [Audio Queue] → [Processing Thread] → [UI Thread]
     (pyaudiowpatch)                    (faster-whisper)        (Tkinter)
```

- **Thread 1**: Continuously captures audio from WASAPI
- **Thread 2**: Pulls audio from queue, runs inference, pushes text
- **Thread 3**: Main thread handles UI updates and user input

### Digital Signal Processing

- **Audio Resampling**: Converts captured audio (48kHz) to model input rate (16kHz)
- **RMS Calculation**: `sqrt(mean(signal^2))` to measure audio power
- **Window Sliding**: FIFO buffer maintains 4-second rolling context
- **Frame Buffering**: Accumulates 1-second chunks before processing

## Source Code

[View on GitHub](https://github.com/Vinz602/Real-Time-Live-Audio-Subtitling-System)

## Future Improvements

- Multi-language support (detect and translate from any language)
- GPU acceleration for faster inference
- Customizable subtitle styling (font, color, size, position)
- Save transcription history to file
- Support for macOS and Linux (currently Windows-only)
- Integration with streaming platforms (OBS overlay)
- Multiple speaker detection and labeling
- Confidence scores display for each subtitle line
