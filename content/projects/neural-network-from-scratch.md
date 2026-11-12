---
title: "Neural Network From Scratch (Pure NumPy)"
slug: "neural-network-from-scratch"
description: "2-layer neural network built with NumPy only, all gradients derived by hand via chain rule, achieving 99.7% accuracy on toy classification task"
category: "Deep Learning"
tags: ["Python", "NumPy", "Neural Networks", "Backpropagation", "Mathematics", "From Scratch"]
date: "2024-08-20"
featured: false
image: "/images/projects/placeholder.svg"
githubUrl: "https://github.com/Vinz602/NeuralNetworkFromScratch"
---

## Problem Statement

Modern deep learning frameworks like PyTorch and TensorFlow abstract away the mathematical foundations of neural networks. While this enables rapid prototyping, it can obscure understanding of how backpropagation actually works. This project builds a **fully functional neural network using only NumPy** - no autograd, no frameworks - with every gradient derived mathematically by hand.

The network is trained on a toy binary classification task (two interleaving "moons") that is **not linearly separable**, demonstrating why hidden layers and nonlinearities are essential.

## Architecture

```
Input (2) → Linear → ReLU → Linear → Sigmoid → Output (1)
              W1,b1           W2,b2
             [2,4]            [4,1]
```

| Layer | Weights | Output Shape | Purpose |
|-------|---------|--------------|---------|
| Linear 1 | W1: [2,4], b1: [1,4] | [N,4] | Project input into higher-dimensional space |
| ReLU | — | [N,4] | Nonlinearity - without it, stacked linear layers collapse into one |
| Linear 2 | W2: [4,1], b2: [1,1] | [N,1] | Combine features into single score |
| Sigmoid | — | [N,1] | Squash score into probability in (0,1) |

## Mathematical Foundation

### Forward Pass

```python
Z1 = X @ W1 + b1        # Linear transformation
A1 = ReLU(Z1)           # Element-wise max(0, Z1)
Z2 = A1 @ W2 + b2       # Second linear transformation  
A2 = sigmoid(Z2)        # 1 / (1 + exp(-Z2))
```

### Loss Function (Binary Cross-Entropy)

```
L = -mean( y*log(A2) + (1-y)*log(1-A2) )
```

### Backward Pass (Chain Rule)

Pairing sigmoid output with BCE loss gives a clean gradient:

```python
# Output layer gradients
dZ2 = A2 - y                        # Simplified due to sigmoid+BCE
dW2 = A1.T @ dZ2 / N                # Average gradient
db2 = mean(dZ2)                     # Average gradient

# Hidden layer gradients  
dA1 = dZ2 @ W2.T                    # Chain rule backward
dZ1 = dA1 * (Z1 > 0)                # ReLU derivative (0 or 1)
dW1 = X.T @ dZ1 / N                 # Average gradient
db1 = mean(dZ1)                     # Average gradient
```

## Technologies

- **Python** - Programming language
- **NumPy** - Only dependency (for matrix operations)
- **Matplotlib** - Visualization of decision boundary
- **Mathematics** - Calculus, linear algebra, chain rule

## Approach

### Key Implementation Details

1. **He Initialization**: Weights initialized with `sqrt(2/fan_in)` for ReLU layers to keep activation variance stable

2. **Numerical Stability**: Added `eps=1e-8` inside log() to avoid `log(0)` when predictions become confident

3. **ReLU Derivative**: Computed from pre-activation `Z1` (Z1 > 0), not post-activation `A1` - equivalent for ReLU but generalizes better

4. **Plain Gradient Descent**: No momentum, no adaptive learning rates - pure SGD with fixed lr=0.5

## Results

### Training Performance

**2000 epochs with learning rate 0.5:**

| Epoch | Loss | Accuracy |
|-------|------|----------|
| 0 | 1.161 | 26.3% |
| 200 | 0.254 | 88.0% |
| 1000 | 0.028 | 99.7% |
| **2000** | **0.015** | **99.7%** |

### Decision Boundary

The learned boundary is **piecewise linear** - a direct fingerprint of ReLU activation. Each of the 4 hidden units contributes one linear "fold", so the boundary consists of a few straight segments stitched together rather than a smooth curve.

**Visual interpretation:**
- With only 4 hidden units → coarse piecewise-linear approximation
- Increasing `hidden_dim` → finer approximation of true curved boundary
- Demonstrates how ReLU networks approximate complex functions through linear pieces

## Challenges & Solutions

### Challenge 1: Vanishing Gradients

Initial random initialization led to dead neurons and slow learning.

**Solution:** Implemented **He initialization** (`W *= sqrt(2/fan_in)`), specifically designed for ReLU. This keeps variance of activations roughly constant across layers.

### Challenge 2: Numerical Instability

Loss became NaN when predictions approached 0 or 1.

**Solution:** Added small epsilon `eps=1e-8` inside logarithms: `log(A2 + eps)` prevents `-inf` from `log(0)`.

### Challenge 3: Debugging Backpropagation

Hand-derived gradients needed verification against numerical gradients.

**Solution:** Implemented **gradient checking** using finite differences. Confirmed analytical gradients match numerical approximation to high precision (error < 1e-7).

### Challenge 4: Choosing Learning Rate

Too high caused oscillation, too low caused slow convergence.

**Solution:** Experimented with learning rates [0.1, 0.5, 1.0, 5.0]. Found 0.5 optimal for this problem - aggressive enough for fast convergence but stable.

## Key Concepts Demonstrated

### Why Hidden Layers Matter

Without the hidden layer (or with linear activation), the network can only learn linear decision boundaries. The two-moons dataset is **not linearly separable** - no straight line can separate the classes. The hidden layer with ReLU nonlinearity enables the network to learn the curved boundary.

### ReLU Piecewise Linearity

ReLU creates "hinge points" where the activation changes from 0 to linear. With 4 hidden units, we get 4 potential hinges, creating a piecewise-linear decision boundary with up to 4 segments. More hidden units = more segments = smoother boundary.

### Sigmoid + BCE = Clean Gradient

The derivative of sigmoid is `σ(x) * (1-σ(x))`, and the derivative of BCE with respect to logits has a `-y/A2 + (1-y)/(1-A2)` term. When combined, they simplify to just `A2 - y` - a remarkably clean expression that avoids numerical issues.

## Source Code

```bash
pip install numpy matplotlib
python nn_from_scratch.py
```

[View on GitHub](https://github.com/Vinz602/NeuralNetworkFromScratch)

## Educational Value

This project serves as a **pedagogical tool** for understanding:
- How matrix operations implement neural network computations
- Why initialization matters (He vs Xavier vs random)
- Where gradients come from (not magic, just calculus)
- How backpropagation is just repeated application of chain rule
- Why nonlinearities are essential (ReLU enables nonlinear boundaries)
- The relationship between loss functions and gradient formulas

## Future Extensions

- Add more layers (3-layer, 4-layer networks)
- Implement other activations (tanh, Leaky ReLU, ELU)
- Add momentum and Adam optimizer from scratch
- Implement mini-batch training
- Add L2 regularization and dropout
- Test on real datasets (MNIST, CIFAR-10)
- Implement convolutional layers from scratch
- Compare speed with NumPy optimizations vs naive loops
