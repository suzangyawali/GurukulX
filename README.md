# 🎓 GurukulX - Learning Management System

<div align="center">
  <img src="client/public/favicon/favicon.svg" alt="GurukulX Logo" width="100" height="100">
  
  **A modern, full-stack Learning Management System built with React, Node.js, and MongoDB**
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green.svg)](https://mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🖼️ Screenshots](#️-screenshots)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Frontend Technical Stack](#️-frontend-technical-stack)
- [⚙️ Backend Technical Stack](#️-backend-technical-stack)
- [📁 Project Structure](#-project-structure)
- [🔐 Authentication & Authorization](#-authentication--authorization)
- [💳 Payment Integration](#-payment-integration)
- [📊 Admin Dashboard](#-admin-dashboard)
- [🎨 UI/UX Design](#-uiux-design)
- [🔧 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Features

### 👨‍🎓 Student Features
- **Course Browsing**: Explore a comprehensive library of courses with detailed descriptions
- **Video Learning**: High-quality video lectures with progress tracking
- **Subscription Management**: Flexible subscription plans with Razorpay integration
- **Profile Management**: Complete profile customization and progress tracking
- **Responsive Design**: Seamless experience across all devices

---

## 🖼️ Screenshots

Quick visual guide to the app (also available in the `screenshots/` folder):

<div style="display:flex;flex-wrap:wrap;gap:12px;">
  <img src="screenshots/Homepage.png" alt="Homepage" width="320" />
  <img src="screenshots/Login.png" alt="Login" width="320" />
  <img src="screenshots/UserProfile.png" alt="User Profile" width="320" />
  <img src="screenshots/DashboardCourseOverview.png" alt="Dashboard Course Overview" width="320" />
  <img src="screenshots/DashboardGraph.png" alt="Dashboard Graph" width="320" />
  <img src="screenshots/AdminCourseLeactureCreate.png" alt="Admin Create Lecture" width="320" />
</div>

Screenshots are stored in the repository under `screenshots/`. Use descriptive filenames like `Homepage.png` or `dashboard-course-overview.png`.

### 👨‍🏫 Instructor Features
- **Course Creation**: Intuitive course creation with multimedia support
- **Lecture Management**: Upload and organize video lectures with descriptions
- **Student Analytics**: Track student engagement and course performance
- **Content Management**: Easy-to-use interface for managing course materials

### 👨‍💼 Admin Features
- **Comprehensive Dashboard**: Real-time analytics and system metrics
- **User Management**: Complete control over user accounts and permissions
- **Course Oversight**: Monitor and manage all courses and instructors
- **System Monitoring**: Track platform performance and user engagement

---

## 🏗️ System Architecture

![System Architecture](system.jpeg)

_System architecture diagram (see `system.jpeg`)._


### 🏠 Homepage
*Clean, modern landing page with course highlights and platform statistics*

![Homepage](screenshots/Homepage.png)

### 📊 Admin Dashboard
*Comprehensive analytics dashboard with real-time metrics and data visualization*

![Admin Dashboard](screenshots/DashboardGraph.png)

### 📚 Course Management
*Intuitive course creation and management interface*

![Course Management](screenshots/DashboardCourseOverview.png)

### 🎥 Video Player
*Enhanced video learning experience with progress tracking*

![Video Player](screenshots/AdminCourseLeactureCreate.png)

### 👤 User Profile
*Modern profile management with subscription details*

![User Profile](screenshots/UserProfile.png)

### 🔐 Authentication
*Secure login system with demo account access*

![Authentication](screenshots/Login.png)
---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18.x or higher)
- **MongoDB** (v6.0 or higher)
- **npm** or **yarn**
- **Razorpay Account** (for payment processing)


### 2. Environment Setup

#### Backend Configuration
```bash
cd server
cp .env.example .env
```

Configure your `.env` file:
```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/lms-gurukul
PORT=8000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRY=7d

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
RAZORPAY_PLAN_ID=your_subscription_plan_id

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@gurukul.com
CONTACT_US_EMAIL=support@gurukul.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration
```bash
cd ../client
```

Create `.env.local`:
```env
REACT_APP_BASE_URL=http://localhost:4000
```

### 3. Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```


### 5. Start Development Servers
```bash
# Terminal 1: Start backend server
cd server
npm run dev

# Terminal 2: Start frontend server
cd client
npm start
```

🎉 **Your application is now running!**
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Admin Dashboard: http://localhost:3000/admin/dashboard

---

## 🛠️ Frontend Technical Stack

### Core Technologies
- **React 18.2.0**: Modern functional components with hooks
- **Redux Toolkit**: Predictable state management
- **React Router DOM**: Client-side routing and navigation
- **Axios**: HTTP client for API communication

### UI/UX Framework
- **Tailwind CSS 3.3.0**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind
- **React Icons (HeroIcons v2)**: Consistent iconography
- **React Hot Toast**: Beautiful notification system

### Media & Charts
- **Chart.js + React-Chartjs-2**: Interactive data visualization
- **React Video Player**: Custom video player with controls
- **Responsive Design**: Mobile-first approach

### Key Features Implementation

#### State Management Architecture
```javascript
// Redux Store Structure
{
  auth: {
    isLoggedIn: boolean,
    data: UserObject,
    role: 'USER' | 'ADMIN'
  },
  course: {
    coursesData: Course[],
    loading: boolean
  },
  razorpay: {
    allPayments: PaymentData,
    subscription_id: string,
    dashboardMetrics: AnalyticsData
  }
}
```

#### Component Structure
```
src/
├── Components/           # Reusable UI components
│   ├── CourseCard.jsx   # Course display component
│   ├── Footer.jsx       # Application footer
│   ├── Modal.jsx        # Modal dialog component
│   └── Auth/            # Authentication components
├── Pages/               # Route-based page components
│   ├── Dashboard/       # Admin dashboard pages
│   ├── Course/          # Course-related pages
│   ├── Payment/         # Payment flow pages
│   └── User/            # User profile pages
├── Redux/               # State management
├── Layout/              # Layout components
└── Helper/              # Utility functions
```

#### Responsive Design System
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: CSS Grid and Flexbox for layouts
- **Typography**: Consistent font scaling across devices

---

## ⚙️ Backend Technical Stack

### Core Technologies
- **Node.js 18.x**: JavaScript runtime environment
- **Express.js 4.18**: Web application framework
- **MongoDB 6.0**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Token for authentication

### Key Middleware & Utilities
- **Multer**: File upload handling
- **Bcryptjs**: Password hashing and security
- **Cors**: Cross-origin resource sharing
- **Morgan**: HTTP request logging
- **Helmet**: Security headers

### Database Architecture

#### User Model
```javascript
{
  fullName: String (required),
  email: String (unique, required),
  password: String (hashed),
  role: ['USER', 'ADMIN'],
  avatar: {
    public_id: String,
    secure_url: String
  },
  subscription: {
    id: String,
    status: ['active', 'inactive', 'cancelled']
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date
}
```

#### Course Model
```javascript
{
  title: String (required),
  description: String (required),
  category: String (required),
  thumbnail: {
    public_id: String,
    secure_url: String
  },
  lectures: [{
    title: String,
    description: String,
    lecture: {
      public_id: String,
      secure_url: String
    }
  }],
  numbersOfLectures: Number,
  createdBy: String (required)
}
```

#### Payment Model
```javascript
{
  razorpay_payment_id: String (required),
  razorpay_subscription_id: String (required),
  razorpay_signature: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### API Architecture

#### RESTful Endpoints Structure
```
/api/v1/
├── auth/                # Authentication routes
│   ├── POST /register   # User registration
│   ├── POST /login      # User login
│   ├── GET /logout      # User logout
│   └── GET /me          # Get current user
├── courses/             # Course management
│   ├── GET /            # Get all courses
│   ├── POST /           # Create new course
│   ├── GET /:id         # Get course by ID
│   ├── PUT /:id         # Update course
│   └── DELETE /:id      # Delete course
├── payments/            # Payment processing
│   ├── POST /subscribe  # Create subscription
│   ├── POST /verify     # Verify payment
│   ├── GET /            # Get payment records
│   └── POST /unsubscribe # Cancel subscription
└── admin/               # Admin-only routes
    ├── GET /stats/users # User statistics
    └── GET /stats/payments # Payment analytics
```

### Security Implementation

#### Authentication Flow
1. **Registration**: Password hashing with bcrypt (salt rounds: 10)
2. **Login**: JWT token generation with 7-day expiry
3. **Middleware**: Route protection with role-based access
4. **Password Reset**: Secure token-based password recovery

#### Middleware Chain
```javascript
// Example protected route
router.get('/admin/dashboard', 
  isLoggedIn,           // Verify JWT token
  authorizeRoles('ADMIN'), // Check user role
  getDashboardData      // Controller function
);
```

---

## 📁 Project Structure

### Frontend Structure
```
client/
├── public/                    # Static assets
│   ├── index.html            # Main HTML template
│   ├── manifest.json         # PWA configuration
│   └── favicon/              # App icons
├── src/
│   ├── Components/           # Reusable components
│   │   ├── CourseCard.jsx   
│   │   ├── Footer.jsx       
│   │   ├── Modal.jsx        
│   │   └── Auth/            # Auth-specific components
│   ├── Pages/               # Route components
│   │   ├── Homepage.js      # Landing page
│   │   ├── Login.js         # Authentication
│   │   ├── Course/          # Course pages
│   │   ├── Dashboard/       # Admin pages
│   │   ├── Payment/         # Payment flow
│   │   └── User/            # User profile
│   ├── Redux/               # State management
│   │   ├── store.js         # Redux store config
│   │   ├── authSlice.js     # Auth state
│   │   ├── courseSlice.js   # Course state
│   │   └── razorpaySlice.js # Payment state
│   ├── Layout/              # Layout components
│   ├── Helper/              # Utility functions
│   └── Assets/              # Images and media
├── package.json             # Dependencies
└── tailwind.config.js       # Tailwind configuration
```

### Backend Structure
```
server/
├── controllers/             # Business logic
│   ├── user.controller.js   # User operations
│   ├── course.controller.js # Course management
│   ├── payment.controller.js # Payment processing
│   └── miscellaneous.controller.js # Utility functions
├── middlewares/             # Custom middleware
│   ├── auth.middleware.js   # Authentication
│   ├── error.middleware.js  # Error handling
│   └── multer.middleware.js # File upload
├── models/                  # Database schemas
│   ├── user.model.js        # User schema
│   ├── course.model.js      # Course schema
│   └── Payment.model.js     # Payment schema
├── routes/                  # API routes
│   ├── user.routes.js       
│   ├── course.routes.js     
│   ├── payment.routes.js    
│   └── miscellaneous.routes.js
├── utils/                   # Utility functions
│   ├── appError.js          # Custom error class
│   └── sendEmail.js         # Email service
├── configs/                 # Configuration files
│   └── dbConn.js           # Database connection
├── uploads/                 # File upload directory
├── app.js                   # Express app setup
├── server.js               # Server entry point
└── package.json            # Dependencies
```

---

## 🔐 Authentication & Authorization

### JWT Token Implementation
- **Access Token**: 7-day expiry for session management
- **Secure Storage**: HttpOnly cookies for enhanced security
- **Role-Based Access**: USER and ADMIN role differentiation

### Security Features
- **Password Hashing**: Bcrypt with salt rounds
- **CORS Protection**: Configured for specific origins
- **Rate Limiting**: API request throttling
- **Input Validation**: Comprehensive data validation
- **XSS Protection**: Security headers with Helmet

### Demo Accounts
```javascript
// Guest Account
Email: guest@example.com
Password: guest123
Role: USER

// Admin Account  
Email: admin@example.com
Password: admin123
Role: ADMIN
```

---

## 💳 Payment Integration

### Razorpay Integration
- **Subscription Plans**: Flexible monthly/yearly subscriptions
- **Payment Verification**: Secure signature validation
- **Webhook Support**: Real-time payment status updates
- **Refund Processing**: Automated refund handling

### Payment Flow
1. **Plan Selection**: User chooses subscription plan
2. **Razorpay Checkout**: Secure payment gateway
3. **Payment Verification**: Backend signature validation
4. **Subscription Activation**: User access granted
5. **Analytics Update**: Revenue tracking

### Supported Payment Methods
- **Credit/Debit Cards**: Visa, MasterCard, RuPay
- **Net Banking**: All major Indian banks
- **UPI**: Google Pay, PhonePe, Paytm
- **Wallets**: Paytm, Mobikwik, etc.

---

## 📊 Admin Dashboard

### Analytics Features
- **Real-time Metrics**: Live user and revenue data
- **Revenue Analytics**: Monthly sales performance charts
- **User Statistics**: Registration and subscription trends
- **Course Management**: Complete CRUD operations
- **Payment Tracking**: Transaction history and analytics

### Dashboard Components
```javascript
// Key Metrics
- Total Signups: 11 users
- Active Subscribers: 4 users  
- Total Payments: 4 transactions
- Total Revenue: ₹1,996

// Charts & Visualizations
- Revenue Analytics: Monthly bar chart
- User Distribution: Pie chart
- Growth Trends: Line graphs
```

### Administrative Functions
- **User Management**: View, edit, and manage user accounts
- **Course Oversight**: Monitor all courses and content
- **Payment Analytics**: Detailed financial reporting
- **System Monitoring**: Platform health and performance

---

## 🎨 UI/UX Design

### Design System
- **Color Palette**: Professional dark theme with orange accents
- **Typography**: Consistent font hierarchy and spacing
- **Iconography**: HeroIcons v2 for consistency
- **Animations**: Subtle transitions and hover effects

### Responsive Design
- **Mobile First**: Optimized for mobile experience
- **Touch Friendly**: Large tap targets and intuitive gestures
- **Performance**: Optimized loading and smooth interactions
- **Accessibility**: WCAG 2.1 compliance for inclusive design

### Component Library
```javascript
// Button Variants
- Primary: Orange gradient buttons
- Secondary: Outline buttons  
- Success: Green confirmation buttons
- Danger: Red warning buttons

// Form Elements
- Input Fields: Consistent styling with validation
- Select Dropdowns: Custom styled selectors
- File Uploads: Drag and drop interface
- Form Validation: Real-time error feedback
```

---

## 🔧 API Documentation

### Authentication Endpoints

#### POST /api/v1/user/register
**Register a new user**
```json
Request Body:
{
  "fullName": "John Doe",
  "email": "john@example.com", 
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

#### POST /api/v1/user/login
**Authenticate user**
```json
Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "User logged in successfully",
  "user": {
    "id": "user_id",
    "fullName": "John Doe", 
    "email": "john@example.com",
    "role": "USER",
    "subscription": {
      "id": "subscription_id",
      "status": "active"
    }
  }
}
```

### Course Endpoints

#### GET /api/v1/courses
**Get all courses**
```json
Response:
{
  "success": true,
  "message": "All courses",
  "courses": [
    {
      "id": "course_id",
      "title": "JavaScript for Beginners",
      "description": "Learn JavaScript fundamentals",
      "category": "Web Development",
      "thumbnail": {
        "secure_url": "https://image-url.com/thumb.jpg"
      },
      "numbersOfLectures": 10,
      "createdBy": "Instructor Name"
    }
  ]
}
```

#### POST /api/v1/courses (Admin Only)
**Create new course**
```json
Request Body:
{
  "title": "Advanced React Concepts",
  "description": "Master React with hooks and context",
  "category": "Web Development",
  "createdBy": "Expert Instructor"
}

Response:
{
  "success": true,
  "message": "Course created successfully",
  "course": {
    "id": "new_course_id",
    "title": "Advanced React Concepts",
    "description": "Master React with hooks and context",
    "category": "Web Development",
    "numbersOfLectures": 0,
    "createdBy": "Expert Instructor"
  }
}
```

### Payment Endpoints

#### POST /api/v1/payments/subscribe
**Create subscription**
```json
Response:
{
  "success": true,
  "message": "Subscribed successfully", 
  "subscription_id": "sub_razorpay_id"
}
```

#### POST /api/v1/payments/verify
**Verify payment**
```json
Request Body:
{
  "razorpay_payment_id": "pay_id",
  "razorpay_subscription_id": "sub_id", 
  "razorpay_signature": "signature"
}

Response:
{
  "success": true,
  "message": "Payment verified successfully",
  "user": {
    "id": "user_id",
    "subscription": {
      "id": "subscription_id",
      "status": "active"
    }
  }
}
```

---

### Additional implemented endpoints (not documented above)

The project exposes the following additional API routes under `/api/v1`:

- GET `/ping` — server health check

User routes:
- POST `/api/v1/user/logout`
- GET `/api/v1/user/me` (requires auth)
- POST `/api/v1/user/reset` (forgot password)
- POST `/api/v1/user/reset/:resetToken` (reset with token)
- POST `/api/v1/user/change-password` (requires auth)
- PUT `/api/v1/user/update/:id` (requires auth)

Course routes (additional):
- DELETE `/api/v1/courses/` (admin)
- GET `/api/v1/courses/:id` (requires auth/authorized subscriber)
- POST `/api/v1/courses/:id` (admin, upload lecture)
- PUT `/api/v1/courses/:id` (admin)
- DELETE `/api/v1/courses/:id` (admin)

Payment routes (additional):
- POST `/api/v1/payments/unsubscribe` (requires auth)
- GET `/api/v1/payments/razorpay-key` (public)
- GET `/api/v1/payments/` (admin)
- GET `/api/v1/payments/dashboard-metrics` (admin)

Miscellaneous:
- POST `/api/v1/contact` (public)
- GET `/api/v1/admin/stats/users` (admin)


## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Component and function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user journey testing
- **Performance Tests**: Load and stress testing

### Test Commands
```bash
# Run frontend tests
cd client
npm test

# Run backend tests  
cd server
npm test

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

---

## 🚀 Deployment

### Production Build

#### Frontend Deployment
```bash
cd client
npm run build
# Deploy build folder to hosting service
```

#### Backend Deployment
```bash
cd server
npm run start
# Deploy to cloud service (Heroku, AWS, etc.)
```

### Environment Configuration

#### Production Environment Variables
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lms-production

# Security
JWT_SECRET=super_secure_production_secret
NODE_ENV=production

# Payment Gateway
RAZORPAY_KEY_ID=rzp_live_key_id
RAZORPAY_SECRET=live_secret_key

# Email Service
SMTP_HOST=smtp.production.com
SMTP_USERNAME=production_email
SMTP_PASSWORD=production_password

# URLs
FRONTEND_URL=https://your-domain.com
```

### Deployment Platforms
- **Frontend**: Vercel, Netlify, AWS S3
- **Backend**: Heroku, AWS EC2, DigitalOcean
- **Database**: MongoDB Atlas, AWS DocumentDB
- **File Storage**: AWS S3, Cloudinary

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

### Development Workflow
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **ESLint**: Follow JavaScript/React linting rules
- **Prettier**: Use consistent code formatting
- **Commit Messages**: Use conventional commit format
- **Documentation**: Update README for new features

### Issue Reporting
Please use the issue tracker to report bugs or request features:
- **Bug Reports**: Include steps to reproduce
- **Feature Requests**: Describe the use case
- **Security Issues**: Report privately via email

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

```
MIT License

Copyright (c) 2024 GurukulX Learning Management System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support & Contact

### Get Help
- **Documentation**: Comprehensive guides and API docs
- **Community Forum**: Join our developer community
- **Email Support**: support@gurukul.com
- **Live Chat**: Available during business hours

### Connect With Us
- **Website**: [https://gurukul.com](https://gurukul.com)
- **LinkedIn**: [GurukulX Official](https://linkedin.com/company/gurukul)
- **Twitter**: [@GurukulX](https://twitter.com/gurukul)

---

<div align="center">
  
  **Made with ❤️ for better education**
  
  *Empowering minds through quality education. Join thousands of learners transforming their careers with our comprehensive learning platform.*
  
  
</div>

---

## 🔄 Version History

### v2.0.0 (Current)
- ✨ Modern UI/UX redesign with dark theme
- 🔧 Enhanced admin dashboard with analytics
- 💳 Improved Razorpay payment integration
- 📱 Full responsive design implementation
- 🔐 Enhanced security and authentication
- 🎥 Advanced video player with progress tracking

### v1.0.0
- 🚀 Initial release with core functionality
- 👥 User registration and authentication
- 📚 Basic course management
- 💰 Payment gateway integration
- 📊 Simple admin dashboard

---

*Last updated: September 2025*
