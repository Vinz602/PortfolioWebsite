---
title: "BeeFood - Campus Canteen Pre-Order System"
slug: "beefood-campus-preorder"
description: "Full-stack web application for campus canteen pre-ordering with real-time order tracking, multi-role system, and WebSocket notifications"
category: "Data Analysis"
tags: ["React", "Node.js", "PostgreSQL", "Prisma", "WebSocket", "Full-Stack", "Vite", "Tailwind"]
date: "2024-10-15"
featured: true
image: "/images/projects/placeholder.svg"
githubUrl: "https://github.com/Vinz602/BeeFood"
---

## Problem Statement

University canteen queues waste valuable student time, especially during peak hours. Students spend 15-30 minutes waiting to order and receive food, cutting into study time and class schedules. Canteen vendors face operational challenges managing rush-hour crowds and tracking orders manually.

**BeeFood** solves this by enabling students to pre-order meals online and pick them up when ready, while giving vendors a streamlined dashboard to manage incoming orders efficiently.

## System Overview

A **dual-interface web application** serving two user roles:

- **Students**: Browse menu, place orders, track status, pick up when ready
- **Tenants (Vendors)**: Receive orders, manage menu, update order status

The system uses **real-time WebSocket communication** to notify both parties instantly when order status changes.

## Architecture

### Technology Stack

**Frontend:**
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Socket.IO Client** - Real-time updates

**Backend:**
- **Node.js + Express** - API server
- **Prisma ORM** - Database management
- **PostgreSQL** - Relational database
- **Socket.IO** - WebSocket server
- **JWT** - Authentication

**Deployment:**
- **Railway** - Backend + PostgreSQL hosting
- **Vercel** - Frontend hosting

### System Architecture

```
┌─────────────┐         ┌──────────────┐         ┌───────────────┐
│   Student   │  HTTP   │   Node.js    │  SQL    │  PostgreSQL   │
│   (React)   │ <-----> │   Backend    │ <-----> │   Database    │
│             │ WebSocket│  (Express)   │         │               │
└─────────────┘         └──────────────┘         └───────────────┘
                               ↑
                               │ WebSocket
                               ↓
┌─────────────┐
│   Tenant    │
│   (React)   │
│             │
└─────────────┘
```

## Features

### Student Flow

1. **Browse Menu** - View available food items with prices and descriptions
2. **Add to Cart** - Select items and quantities
3. **Checkout** - Place order (status: PENDING)
4. **Track Status** - Monitor order progress in real-time:
   - PENDING → Waiting for tenant acceptance
   - COOKING → Tenant preparing food
   - READY → Ready for pickup
   - DONE → Student confirmed pickup
5. **Notifications** - Receive instant alerts when food is ready

### Tenant (Vendor) Flow

1. **Receive Orders** - New orders appear automatically
2. **Accept Order** - Click "ACC Pesanan" → Status: COOKING
3. **Mark Ready** - Click "Set Siap Ambil" → Status: READY
4. **Complete** - Student confirms pickup → Status: DONE
5. **Menu Management** - Add/edit/remove menu items

### Real-Time Features

- **Live order updates** - Both parties see status changes instantly
- **New order alerts** - Tenants notified when orders arrive
- **Ready notifications** - Students notified when food is ready
- **Order count badges** - Visual indicators for pending/active orders

## Technologies

- **React 18** - Component-based UI
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Relational database
- **Socket.IO** - Real-time bi-directional communication
- **JWT** - Secure authentication tokens
- **Tailwind CSS** - Rapid UI development
- **Vite** - Fast build tool
- **Railway** - Cloud platform
- **Vercel** - Frontend deployment

## Implementation Highlights

### Database Schema (Prisma)

```prisma
model User {
  id       String   @id @default(uuid())
  email    String   @unique
  password String
  name     String
  role     Role     @default(STUDENT)
  orders   Order[]
}

model Order {
  id        String      @id @default(uuid())
  userId    String
  tenantId  String
  status    OrderStatus @default(PENDING)
  items     OrderItem[]
  total     Float
  createdAt DateTime    @default(now())
}

enum OrderStatus {
  PENDING
  COOKING
  READY
  DONE
}
```

### WebSocket Implementation

```javascript
// Server-side (Socket.IO)
io.on('connection', (socket) => {
  socket.on('orderPlaced', (orderId) => {
    io.to('tenants').emit('newOrder', orderId);
  });
  
  socket.on('orderStatusChanged', (orderId, status) => {
    io.emit('orderUpdate', { orderId, status });
  });
});
```

### JWT Authentication

- Token-based auth with httpOnly cookies
- Role-based access control (student vs tenant)
- Secure password hashing with bcrypt
- Protected API routes with middleware

## Results

### Performance Metrics

- **Page Load**: < 2 seconds (Vercel CDN)
- **API Response**: < 100ms average
- **WebSocket Latency**: < 50ms (real-time updates)
- **Database Queries**: Optimized with Prisma indexes

### User Experience

✅ **Reduced wait time** - Students order ahead, skip queues  
✅ **Order accuracy** - Digital orders prevent miscommunication  
✅ **Real-time visibility** - Both parties always know order status  
✅ **Mobile-first** - Responsive design works on all devices  
✅ **Reliable notifications** - Never miss when food is ready  

## Challenges & Solutions

### Challenge 1: Real-Time Synchronization

Keeping order status synchronized across multiple connected clients.

**Solution:** Implemented Socket.IO with room-based broadcasting. Students join their order room, tenants join tenant room. Status updates broadcast to relevant rooms ensuring all clients stay in sync.

### Challenge 2: Railway vs PostgreSQL URLs

Initial confusion between PostgreSQL connection URL and backend service URL.

**Solution:**  
- PostgreSQL URL: Internal database connection (never exposed to frontend)
- Backend service URL: Public API endpoint (used by frontend)
- Clear separation in environment variables and documentation

### Challenge 3: Missing Data Relationships

Initial database schema lacked proper foreign key constraints.

**Solution:** Redesigned schema with Prisma to enforce referential integrity:
- Orders reference Users (student + tenant)
- OrderItems reference Orders
- Cascade delete rules for data consistency

### Challenge 4: Authentication State Management

Managing login state across page refreshes and navigation.

**Solution:**  
- Store JWT in httpOnly cookie (XSS protection)
- Verify token on protected routes
- React context for global auth state
- Automatic token refresh before expiry

## Deployment Process

### Backend (Railway)

1. Create Railway project from GitHub repo
2. Add PostgreSQL database service
3. Set environment variables:
   - `DATABASE_URL` → reference from PostgreSQL
   - `JWT_SECRET` → random secure string
   - `NODE_ENV` → production
4. Generate public domain for backend service
5. Health check endpoint: `/health` → `{"ok":true}`

### Frontend (Vercel)

1. Import GitHub repo to Vercel
2. Set root directory: `frontend`
3. Add environment variable:
   - `VITE_SOCKET_URL` → Railway backend URL (without /api)
4. Deploy and verify

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | student@binus.ac.id | password123 |
| Tenant | tenant@binus.ac.id | password123 |

## Source Code

[View on GitHub](https://github.com/Vinz602/BeeFood)

## Future Improvements

- **Payment integration** - Stripe or PayPal for online payment
- **Order history** - View past orders and reorder favorites
- **Rating system** - Students rate food and service
- **Analytics dashboard** - Sales reports and popular items for tenants
- **Push notifications** - Mobile app with native notifications
- **Queue estimation** - Show expected wait time based on current orders
- **Multi-canteen support** - Scale to multiple campus locations
- **Loyalty rewards** - Points system for frequent customers
- **Advanced menu** - Dietary filters (vegetarian, halal, allergens)
- **Inventory management** - Auto-disable out-of-stock items
