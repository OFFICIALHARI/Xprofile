# API Integration Guide

## Base Configuration

```javascript
Base URL: http://localhost:8080/api
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json (except file uploads)
```

---

## Authentication APIs

### 1. Register User
```javascript
POST /api/auth/register

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "profileImageUrl": "https://cloudinary.com/..." // optional
}

Response: 201 Created
{
  "message": "User registered successfully. Please verify your email."
}
```

### 2. Upload Profile Image
```javascript
POST /api/auth/upload-image
Content-Type: multipart/form-data

Request (FormData):
- image: File

Response: 200 OK
{
  "url": "https://res.cloudinary.com/..."
}
```

### 3. Login
```javascript
POST /api/auth/login

Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profileImageUrl": "https://...",
    "subscriptionPlan": "Basic",
    "emailVerified": true
  }
}
```

### 4. Verify Email
```javascript
GET /api/auth/verify-email?token={verificationToken}

Response: 200 OK
{
  "message": "Email verified successfully"
}
```

### 5. Get User Profile
```javascript
GET /api/auth/profile
Authorization: Bearer {token}

Response: 200 OK
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profileImageUrl": "https://...",
    "subscriptionPlan": "Premium",
    "emailVerified": true
  }
}
```

### 6. Resend Verification
```javascript
POST /api/auth/resend-verification

Request:
{
  "email": "john@example.com"
}

Response: 200 OK
{
  "success": true,
  "message": "Verification email sent successfully"
}
```

---

## Resume APIs

### 1. Create Resume
```javascript
POST /api/resumes
Authorization: Bearer {token}

Request:
{
  "title": "Software Engineer Resume"
}

Response: 201 Created
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "title": "Software Engineer Resume",
  "thumbnailLink": null,
  "template": {
    "theme": "Template01",
    "colorPalette": ["#1e40af", "#3b82f6", "#60a5fa"]
  },
  "profileInfo": {
    "fullName": "",
    "designation": "",
    "summary": ""
  },
  "contactInfo": {},
  "workExperience": [],
  "education": [],
  "skills": [],
  "projects": [],
  "certifications": [],
  "languages": [],
  "createdAt": "2026-02-01T10:30:00Z",
  "updatedAt": "2026-02-01T10:30:00Z"
}
```

### 2. Get All User Resumes
```javascript
GET /api/resumes
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Software Engineer Resume",
    "thumbnailLink": "https://...",
    "updatedAt": "2026-02-01T10:30:00Z"
  },
  // ... more resumes
]
```

### 3. Get Resume by ID
```javascript
GET /api/resumes/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "title": "Software Engineer Resume",
  "template": { ... },
  "profileInfo": { ... },
  "contactInfo": { ... },
  "workExperience": [ ... ],
  "education": [ ... ],
  "skills": [ ... ],
  "projects": [ ... ],
  "certifications": [ ... ],
  "languages": [ ... ]
}
```

### 4. Update Resume
```javascript
PUT /api/resumes/{id}
Authorization: Bearer {token}

Request: (Full resume object)
{
  "title": "Updated Resume Title",
  "template": {
    "theme": "Template02",
    "colorPalette": ["#7c3aed", "#a855f7", "#c084fc"]
  },
  "profileInfo": {
    "fullName": "John Doe",
    "designation": "Senior Software Engineer",
    "summary": "Experienced developer with 5+ years..."
  },
  "contactInfo": {
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "New York, USA",
    "linkedIn": "linkedin.com/in/johndoe",
    "github": "github.com/johndoe",
    "website": "johndoe.com"
  },
  "workExperience": [
    {
      "company": "Tech Corp",
      "role": "Senior Developer",
      "startDate": "Jan 2020",
      "endDate": "Present",
      "description": "Led development of..."
    }
  ],
  "education": [
    {
      "degree": "B.S. Computer Science",
      "institution": "University of Tech",
      "startDate": "2015",
      "endDate": "2019"
    }
  ],
  "skills": [
    {
      "name": "JavaScript",
      "progress": 90
    },
    {
      "name": "React",
      "progress": 85
    }
  ],
  "projects": [
    {
      "title": "E-commerce Platform",
      "description": "Built a full-stack e-commerce...",
      "github": "github.com/johndoe/ecommerce",
      "liveDemo": "example.com"
    }
  ],
  "certifications": [
    {
      "title": "AWS Certified Developer",
      "issuer": "Amazon Web Services",
      "year": "2023"
    }
  ],
  "languages": [
    {
      "name": "English",
      "progress": 100
    },
    {
      "name": "Spanish",
      "progress": 70
    }
  ]
}

Response: 200 OK
{
  // Updated resume object
}
```

---

## Payment APIs

### 1. Create Order
```javascript
POST /api/payments/create-order
Authorization: Bearer {token}

Request:
{
  "planType": "PREMIUM"
}

Response: 200 OK
{
  "orderId": "order_NXMpQ3fJeD5Zbb",
  "amount": 29900, // in paise (₹299)
  "currency": "INR"
}
```

### 2. Verify Payment
```javascript
POST /api/payments/verify
Authorization: Bearer {token}

Request:
{
  "razorpayOrderId": "order_NXMpQ3fJeD5Zbb",
  "razorpayPaymentId": "pay_NXMpQ3fJeD5Zcc",
  "razorpaySignature": "signature_hash_here"
}

Response: 200 OK
{
  "success": true,
  "message": "Payment verified successfully"
}
```

### 3. Payment History
```javascript
GET /api/payments/history
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": "507f1f77bcf86cd799439011",
    "razorpayOrderId": "order_NXMpQ3fJeD5Zbb",
    "razorpayPaymentId": "pay_NXMpQ3fJeD5Zcc",
    "amount": 29900,
    "currency": "INR",
    "status": "SUCCESS",
    "createdAt": "2026-02-01T10:30:00Z"
  }
]
```

---

## Templates API

### 1. Get Templates
```javascript
GET /api/templates
Authorization: Bearer {token}

Response: 200 OK
{
  "templates": [
    {
      "id": "Template01",
      "name": "Professional",
      "premium": false
    },
    {
      "id": "Template02",
      "name": "Modern",
      "premium": false
    },
    {
      "id": "Template03",
      "name": "Creative",
      "premium": true
    }
  ],
  "userPlan": "Basic"
}
```

---

## Email API

### 1. Send Resume
```javascript
POST /api/email/send-resume
Authorization: Bearer {token}
Content-Type: multipart/form-data

Request (FormData):
- recipientEmail: "recruiter@company.com"
- subject: "Job Application - Software Engineer"
- message: "Please find my resume attached..."
- pdfFile: File (PDF)

Response: 200 OK
{
  "success": true,
  "message": "Resume sent successfully to recruiter@company.com"
}
```

---

## Error Responses

### 400 Bad Request
```javascript
{
  "message": "Validation error message",
  "errors": {
    "email": "Email is required",
    "password": "Password must be at least 6 characters"
  }
}
```

### 401 Unauthorized
```javascript
{
  "message": "Invalid credentials"
}
// or
{
  "message": "Token expired"
}
```

### 403 Forbidden
```javascript
{
  "message": "Email not verified"
}
// or
{
  "message": "Premium subscription required"
}
```

### 404 Not Found
```javascript
{
  "message": "Resume not found"
}
```

### 500 Internal Server Error
```javascript
{
  "message": "An error occurred. Please try again."
}
```

---

## Frontend Usage Examples

### Using the API utility

```javascript
import { authAPI, resumeAPI, paymentAPI, emailAPI } from './utils/api';

// Register
const response = await authAPI.register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123"
});

// Login
const { data } = await authAPI.login({
  email: "john@example.com",
  password: "password123"
});
localStorage.setItem('token', data.token);

// Get resumes
const resumes = await resumeAPI.getUserResumes();

// Update resume
await resumeAPI.updateResume(resumeId, resumeData);

// Create payment order
const order = await paymentAPI.createOrder('PREMIUM');

// Send resume email
const formData = new FormData();
formData.append('recipientEmail', 'recruiter@company.com');
formData.append('subject', 'My Resume');
formData.append('message', 'Please review my resume');
formData.append('pdfFile', pdfFile);
await emailAPI.sendResume(formData);
```

---

## CORS Configuration

Backend must allow:
```
Origin: http://localhost:5173
Methods: GET, POST, PUT, DELETE, OPTIONS
Headers: Content-Type, Authorization
Credentials: true
```

---

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"test123"}'

# Get resumes (with token)
curl -X GET http://localhost:8080/api/resumes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Rate Limiting

No rate limiting is currently implemented, but consider adding:
- 5 requests/minute for authentication endpoints
- 100 requests/minute for regular endpoints
- 10 requests/hour for email sending

---

## Best Practices

1. **Always include JWT token** for protected endpoints
2. **Handle token expiration** - redirect to login on 401
3. **Validate data** before sending to API
4. **Show loading states** during API calls
5. **Handle errors gracefully** with user-friendly messages
6. **Use multipart/form-data** for file uploads
7. **Store sensitive data** (tokens) in localStorage, not cookies
8. **Clear tokens** on logout

---

## Notes

- All timestamps are in ISO 8601 format
- File uploads limited to 10MB
- JWT tokens expire in 24 hours
- Password must be at least 6 characters
- Email verification required before full access
