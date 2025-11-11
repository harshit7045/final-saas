# OSINT SaaS Application

## Overview
Full-stack OSINT (Open Source Intelligence) investigation platform offering email, phone, social media, and image analysis tools with integrated payment system.

## Purpose
Provides users with various OSINT investigation capabilities through a user-friendly web interface. Users can purchase credits and use them to perform different types of investigations.

## Current State
- Full-stack application with React frontend and Express backend
- MongoDB database for user management
- Stripe payment integration
- Multiple OSINT tools implemented
- JWT-based authentication system

## Recent Changes
- Project initialized (November 11, 2025)

## Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS + Material-UI
- **Routing:** React Router v6
- **Payments:** Stripe React components
- **State:** React hooks + cookies for auth

### Backend
- **Runtime:** Node.js with ES modules
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcrypt
- **File Upload:** Multer
- **External APIs:** SerpAPI for OSINT, Stripe for payments
- **Server:** Runs on port 7000 by default

## Project Architecture

### Frontend Structure
```
frontend/src/
├── components/        # Reusable UI components
├── pages/            # Route-based page components  
├── assets/           # Static images
└── App.jsx           # Main routing configuration
```

### Backend Structure
```
backend/src/
├── features/         # Feature-based organization
│   ├── email/        # Email OSINT
│   ├── phonenumber/  # Phone OSINT
│   ├── socialmedia/  # Social media OSINT
│   ├── image/        # Image OSINT
│   ├── payments/     # Stripe integration
│   └── users/        # Authentication & user management
├── middelwares/      # JWT verification middleware
├── db/               # Database connection
└── index.js          # Server entry point
```

### Key Features
1. **Email OSINT** - Investigation tools for email addresses
2. **Phone OSINT** - Phone number lookup and analysis
3. **Social Media OSINT** - Social media profile investigation
4. **Image OSINT** - Reverse image search and metadata analysis
5. **User System** - Registration, login, profile management
6. **Wallet System** - Credit-based usage (users start with 100 credits)
7. **Payment Integration** - Stripe checkout for purchasing credits

## Environment Variables Required

### Backend (.env in backend/src/)
```
MONGODB_URI=<MongoDB connection string>
PORT=7000
CORS_ORIGIN=<frontend URL>
JWT_SECRET=<secret key for JWT>
STRIPE_SECRET_KEY=<Stripe secret key>
SERPAPI_KEY=<SerpAPI key for OSINT tools>
```

### Frontend
Frontend may need environment variables for API endpoints and Stripe public key.

## Database Schema

### User Model
- email (String, unique, required)
- password (String, hashed with bcrypt, required)
- name (String, required)
- walletBalance (Number, default: 100)

## API Routes
- `/api/user` - User authentication and management
- `/api/payment` - Stripe payment processing
- `/api/emailosint` - Email investigation endpoints
- `/api/phoneosint` - Phone number investigation
- `/api/socialmediaosint` - Social media investigation
- `/api/imageosint` - Image analysis endpoints

## Development Setup
1. Install dependencies in both frontend and backend directories
2. Configure environment variables
3. Ensure MongoDB is running and accessible
4. Start backend server (port 7000)
5. Start frontend dev server (Vite)

## Dependencies Notes
- Backend uses ES modules (type: "module" in package.json)
- Frontend built with Vite for fast development
- Tailwind CSS configured for styling
- Material-UI provides component library

## User Preferences
None specified yet.

## Architectural Decisions
- **Date:** November 11, 2025
- Feature-based backend organization for better scalability
- Separation of concerns with routers, controllers, and models
- JWT authentication stored in cookies
- Wallet-based credit system for monetization
- Multer for handling image uploads to local filesystem
