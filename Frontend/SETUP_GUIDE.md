# Resume Builder - Complete Setup Guide

## Backend Analysis

The backend is a Spring Boot application with MongoDB that provides:

### API Endpoints
1. **Authentication** (`/api/auth`)
   - POST `/register` - User registration
   - POST `/login` - User login  
   - GET `/verify-email?token={token}` - Email verification
   - POST `/upload-image` - Profile picture upload (Cloudinary)
   - GET `/profile` - Get current user profile
   - POST `/resend-verification` - Resend verification email

2. **Resumes** (`/api/resumes`)
   - POST `/` - Create resume
   - GET `/` - Get all user resumes
   - GET `/{id}` - Get specific resume
   - PUT `/{id}` - Update resume
   - PUT `/{id}/upload-images` - Upload resume images

3. **Payments** (`/api/payments`)
   - POST `/create-order` - Create Razorpay order
   - POST `/verify` - Verify payment
   - GET `/history` - Payment history
   - GET `/order/{orderId}` - Order details

4. **Templates** (`/api/templates`)
   - GET `/` - Get available templates

5. **Email** (`/api/email`)
   - POST `/send-resume` - Send resume via email with attachment

### Data Models
- **User**: name, email, password, profileImageUrl, subscriptionPlan, emailVerified
- **Resume**: title, template, profileInfo, contactInfo, workExperience, education, skills, projects, certifications, languages
- **Payment**: razorpayOrderId, amount, currency, status

## Frontend Implementation

### ✅ Completed Features

#### Phase 1: Foundation
- React + Vite + Tailwind CSS setup
- Axios API utility with JWT interceptor
- Base URL: `http://localhost:8080/api`
- Automatic token attachment for all authenticated requests

#### Phase 2: Landing Page
- Professional hero section with CTA buttons
- Features showcase (Live Preview, Templates, PDF Export, Email)
- Pricing table (Basic ₹0 vs Premium ₹299)
- Video walkthrough placeholder
- Responsive footer

#### Phase 3: Authentication System
- **Register Page**: Name, email, password with profile picture upload
- **Verify Email Page**: Email verification flow with resend functionality
- **Login Page**: Secure JWT authentication
- Token storage in localStorage
- Protected routes with automatic redirect

#### Phase 4: User Dashboard
- User profile display with avatar
- Resume grid view with thumbnails
- Create new resume modal
- Premium/Basic plan badge
- Upgrade to Premium button

#### Phase 5: Interactive Resume Builder
- **Split-screen interface**: Form (left) + Live Preview (right)
- **Multi-section form** with tab navigation:
  - Profile Info (name, designation, summary)
  - Contact Details (email, phone, location, LinkedIn, GitHub, website)
  - Work Experience (company, role, dates, description)
  - Education (degree, institution, dates)
  - Skills (name + progress bar)
  - Projects (title, description, GitHub, live demo)
  - Certifications (title, issuer, year)
  - Languages (name + proficiency)
  - Theme (template selection + color palette)
- **Live Preview**: Real-time updates with custom colors
- Save button with API integration

#### Phase 6: Payment Integration
- Razorpay SDK integration
- Create order → Open checkout → Verify payment flow
- Premium upgrade page with feature comparison
- Lifetime access for ₹299

#### Phase 7: Export & Email
- Email modal with recipient, subject, message
- PDF file upload and attachment
- Multipart form-data submission to backend

## How to Run

### Backend
```bash
cd ResumeBuilderBackend
./mvnw spring-boot:run
```
Backend runs on: `http://localhost:8080`

### Frontend
```bash
cd resume-builder-frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

## Configuration

### Backend CORS
Ensure CORS is enabled in SecurityConfig.java for `http://localhost:5173`

### Razorpay
Update Razorpay Key ID in `src/pages/UpgradePage.jsx`:
```javascript
key: 'YOUR_RAZORPAY_KEY_ID'
```

### Environment Variables
Backend should have:
- MongoDB connection string
- Cloudinary credentials
- Razorpay API keys
- Email SMTP settings

## Project Structure

```
resume-builder-frontend/
├── src/
│   ├── components/
│   │   ├── EmailModal.jsx          # Email resume to recruiter
│   │   ├── ProtectedRoute.jsx      # Route protection
│   │   ├── ResumeForm.jsx          # Multi-section form
│   │   └── ResumePreview.jsx       # Live preview
│   ├── pages/
│   │   ├── Dashboard.jsx           # User dashboard
│   │   ├── LandingPage.jsx         # Public landing
│   │   ├── LoginPage.jsx           # Login
│   │   ├── RegisterPage.jsx        # Registration
│   │   ├── ResumeBuilder.jsx       # Split-screen builder
│   │   ├── UpgradePage.jsx         # Premium upgrade
│   │   └── VerifyEmailPage.jsx     # Email verification
│   ├── utils/
│   │   └── api.js                  # Axios + API calls
│   ├── App.jsx                     # Routing
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Tailwind + styles
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Key Features

### Real-time Preview
As you type in the form, the preview updates instantly with the selected theme and colors.

### Theme Customization
- Choose from Template01, Template02, Template03
- Select from 5 color palettes
- Colors applied to headings and progress bars

### Data Persistence
All resume data is saved to MongoDB when you click "Save" button.

### Responsive Design
Works on desktop, tablet, and mobile devices with Tailwind responsive utilities.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Axios, React Router v6, Lucide React
- **Backend**: Spring Boot, MongoDB, JWT, Cloudinary, Razorpay, JavaMail
- **Payment**: Razorpay
- **Storage**: MongoDB for data, Cloudinary for images

## User Flow

1. **Landing** → View features and pricing
2. **Register** → Upload profile picture, enter details
3. **Verify Email** → Click link in email
4. **Login** → Get JWT token
5. **Dashboard** → View/create resumes
6. **Builder** → Fill form, see live preview, save
7. **Upgrade** → Pay ₹299 for premium features
8. **Email** → Send resume to recruiters

## API Data Flow

### Creating a Resume
```
Frontend: POST /api/resumes { title: "My Resume" }
Backend: Creates resume with default data
Response: { _id, title, userId, template, ... }
Frontend: Navigate to /builder/{_id}
```

### Updating a Resume
```
Frontend: PUT /api/resumes/{id} { ...fullResumeData }
Backend: Updates MongoDB document
Response: Updated resume object
Frontend: Shows "Saved successfully" message
```

### Payment Flow
```
1. Frontend: POST /api/payments/create-order { planType: "PREMIUM" }
2. Backend: Creates Razorpay order
3. Response: { orderId, amount, currency }
4. Frontend: Opens Razorpay checkout
5. User: Completes payment
6. Razorpay: Calls handler with paymentId, signature
7. Frontend: POST /api/payments/verify { orderId, paymentId, signature }
8. Backend: Verifies signature, updates user to Premium
9. Frontend: Redirects to dashboard
```

## Deployment Notes

- Set backend base URL to production API endpoint
- Update Razorpay keys for production
- Enable HTTPS for production
- Configure CORS for production frontend URL
- Set up MongoDB Atlas for production database

## Support

All 7 phases have been successfully implemented with full backend integration!
