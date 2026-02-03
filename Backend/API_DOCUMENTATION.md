# Complete API Documentation - Resume Builder

> 📌 **For interactive API testing, visit Swagger UI at:** `http://localhost:8080/swagger-ui.html`

---

## 📋 Table of Contents
1. [Base Configuration](#base-configuration)
2. [Authentication APIs](#authentication-apis)
3. [Resume APIs](#resume-apis)
4. [Payment APIs](#payment-apis)
5. [Templates APIs](#templates-apis)
6. [Email APIs](#email-apis)
7. [Error Responses](#error-responses)
8. [Status Codes](#status-codes)

---

## Base Configuration

```
Base URL: http://localhost:8080/api
Content-Type: application/json
Authorization: Bearer {JWT_TOKEN}
```

### Adding Authorization Header
All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔐 Authentication APIs

### 1. Register User
Create a new user account with email verification.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully. Please verify your email."
}
```

**Error Responses:**
```json
// 400 Bad Request - Validation failed
{
  "message": "Email is already registered",
  "errors": ["Email already exists"]
}

// 400 Bad Request - Invalid input
{
  "message": "Validation failed",
  "errors": ["Password must be at least 6 characters"]
}
```

---

### 2. Login
Authenticate user and get JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profileImageUrl": "https://res.cloudinary.com/...",
    "subscriptionPlan": "Basic",
    "emailVerified": true
  }
}
```

**Error Responses:**
```json
// 401 Unauthorized - Invalid credentials
{
  "message": "Invalid email or password"
}

// 403 Forbidden - Email not verified
{
  "message": "Please verify your email before login"
}
```

---

### 3. Verify Email
Verify user's email address using the token sent to their email.

**Endpoint:** `GET /api/auth/verify-email?token=abc123xyz`

**Query Parameters:**
- `token` (string, required) - Email verification token sent to user's email

**Response:** `200 OK`
```json
{
  "message": "Email verified successfully"
}
```

**Error Responses:**
```json
// 400 Bad Request - Invalid or expired token
{
  "message": "Invalid or expired verification token"
}

// 404 Not Found - User not found
{
  "message": "User not found"
}
```

---

### 4. Upload Profile Image
Upload and store user's profile picture on Cloudinary.

**Endpoint:** `POST /api/auth/upload-image`

**Headers:**
- `Content-Type: multipart/form-data`

**Form Data:**
- `image` (file, required) - Image file (JPG, PNG, WebP)
  - Max size: 5MB
  - Supported formats: JPG, PNG, WebP

**Response:** `200 OK`
```json
{
  "imageUrl": "https://res.cloudinary.com/dvhir9p10/image/upload/v1234567890/abc123.jpg"
}
```

**Error Responses:**
```json
// 400 Bad Request - File validation failed
{
  "message": "Invalid file format. Supported: JPG, PNG, WebP"
}

// 413 Payload Too Large - File exceeds size limit
{
  "message": "File size exceeds 5MB limit"
}

// 500 Internal Server Error - Upload failed
{
  "message": "Failed to upload image to Cloudinary"
}
```

---

### 5. Get User Profile
Retrieve current authenticated user's profile information.

**Endpoint:** `GET /api/auth/profile`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Response:** `200 OK`
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profileImageUrl": "https://res.cloudinary.com/...",
    "subscriptionPlan": "Premium",
    "emailVerified": true,
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

**Error Responses:**
```json
// 401 Unauthorized - Token missing or invalid
{
  "message": "Unauthorized"
}
```

---

### 6. Update User Profile
Update current user's profile information.

**Endpoint:** `PUT /api/auth/profile`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Request Body:**
```json
{
  "name": "Jane Doe",
  "profileImageUrl": "https://res.cloudinary.com/..."
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "john@example.com",
    "profileImageUrl": "https://res.cloudinary.com/...",
    "subscriptionPlan": "Premium"
  }
}
```

**Error Responses:**
```json
// 400 Bad Request - Invalid input
{
  "message": "Name cannot be empty"
}
```

---

### 7. Resend Verification Email
Send verification email again if user missed the initial email.

**Endpoint:** `POST /api/auth/resend-verification`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Verification email sent successfully"
}
```

**Error Responses:**
```json
// 400 Bad Request - Email required
{
  "message": "Email is required"
}

// 404 Not Found - User not found
{
  "message": "User not found"
}

// 400 Bad Request - Email already verified
{
  "message": "Email is already verified"
}
```

---

### 8. Validate Token
Check if JWT token is valid (useful for frontend auth persistence).

**Endpoint:** `GET /api/auth/validate`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Response:** `200 OK`
```json
"Token validation is working"
```

**Error Responses:**
```json
// 401 Unauthorized - Invalid token
{
  "message": "Unauthorized"
}
```

---

## 📄 Resume APIs

### 1. Create Resume
Create a new resume for the authenticated user.

**Endpoint:** `POST /api/resumes`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Request Body:**
```json
{
  "title": "Senior Developer Resume",
  "template": "Template01"
}
```

**Response:** `201 Created`
```json
{
  "_id": "65a7f1b2c9d8e0f9a1b2c3d4",
  "userId": "507f1f77bcf86cd799439011",
  "title": "Senior Developer Resume",
  "template": "Template01",
  "colorPalette": ["#000000", "#FF6B6B", "#FFFFFF"],
  "profileInfo": {
    "fullName": "",
    "designation": "",
    "summary": ""
  },
  "workExperience": [],
  "education": [],
  "skills": [],
  "projects": [],
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

**Error Responses:**
```json
// 400 Bad Request - Invalid title
{
  "message": "Resume title is required"
}
```

---

### 2. Get All User Resumes
Retrieve all resumes created by the authenticated user.

**Endpoint:** `GET /api/resumes`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Response:** `200 OK`
```json
[
  {
    "_id": "65a7f1b2c9d8e0f9a1b2c3d4",
    "title": "Senior Developer Resume",
    "template": "Template01",
    "createdAt": "2025-01-15T10:30:00Z"
  },
  {
    "_id": "65a7f1b2c9d8e0f9a1b2c3d5",
    "title": "Junior Developer Resume",
    "template": "Template02",
    "createdAt": "2025-01-14T15:45:00Z"
  }
]
```

**Error Responses:**
```json
// 401 Unauthorized - Token missing
{
  "message": "Unauthorized"
}
```

---

### 3. Get Resume by ID
Retrieve a specific resume by its ID.

**Endpoint:** `GET /api/resumes/{id}`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (string, required) - Resume ID

**Response:** `200 OK`
```json
{
  "_id": "65a7f1b2c9d8e0f9a1b2c3d4",
  "userId": "507f1f77bcf86cd799439011",
  "title": "Senior Developer Resume",
  "template": "Template01",
  "colorPalette": ["#000000", "#FF6B6B", "#FFFFFF"],
  "profileInfo": {
    "fullName": "John Doe",
    "designation": "Senior Software Developer",
    "summary": "Experienced developer with 5+ years in full-stack development",
    "profileImageUrl": "https://res.cloudinary.com/..."
  },
  "contactInfo": {
    "email": "john@example.com",
    "phone": "+1-555-0123",
    "location": "San Francisco, CA",
    "linkedIn": "linkedin.com/in/johndoe",
    "github": "github.com/johndoe",
    "website": "johndoe.dev"
  },
  "workExperience": [
    {
      "company": "Tech Corp",
      "role": "Senior Developer",
      "startDate": "2022-01",
      "endDate": "present",
      "description": "Led development of microservices architecture"
    }
  ],
  "education": [
    {
      "degree": "B.S. Computer Science",
      "institution": "Stanford University",
      "startDate": "2015",
      "endDate": "2019"
    }
  ],
  "skills": [
    {
      "name": "React",
      "proficiency": 95
    },
    {
      "name": "Spring Boot",
      "proficiency": 90
    }
  ],
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

**Error Responses:**
```json
// 404 Not Found - Resume doesn't exist
{
  "message": "Resume not found"
}

// 403 Forbidden - User doesn't own this resume
{
  "message": "Unauthorized to access this resume"
}
```

---

### 4. Update Resume
Update an existing resume with new data.

**Endpoint:** `PUT /api/resumes/{id}`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (string, required) - Resume ID

**Request Body:**
```json
{
  "title": "Updated Resume Title",
  "profileInfo": {
    "fullName": "Jane Doe",
    "designation": "Lead Developer",
    "summary": "Passionate about building scalable solutions"
  },
  "workExperience": [
    {
      "company": "Tech Corp",
      "role": "Lead Developer",
      "startDate": "2023-01",
      "endDate": "present",
      "description": "Architecting cloud-native solutions"
    }
  ]
}
```

**Response:** `200 OK`
```json
{
  "_id": "65a7f1b2c9d8e0f9a1b2c3d4",
  "title": "Updated Resume Title",
  "profileInfo": {
    "fullName": "Jane Doe",
    "designation": "Lead Developer",
    "summary": "Passionate about building scalable solutions"
  },
  "updatedAt": "2025-01-15T11:45:00Z"
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "message": "Resume not found"
}
```

---

### 5. Upload Resume Images
Upload thumbnail and profile images for a resume.

**Endpoint:** `PUT /api/resumes/{id}/upload-images`

**Headers:**
- `Authorization: Bearer {token}` (required)
- `Content-Type: multipart/form-data`

**Path Parameters:**
- `id` (string, required) - Resume ID

**Form Data:**
- `thumbnail` (file, optional) - Resume thumbnail image
- `profileImage` (file, optional) - Profile picture for resume

**Response:** `200 OK`
```json
{
  "thumbnailUrl": "https://res.cloudinary.com/...",
  "profileImageUrl": "https://res.cloudinary.com/..."
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "message": "Resume not found"
}

// 400 Bad Request
{
  "message": "At least one image must be provided"
}
```

---

### 6. Delete Resume
Delete a resume permanently.

**Endpoint:** `DELETE /api/resumes/{id}`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (string, required) - Resume ID

**Response:** `200 OK`
```json
{
  "message": "Resume deleted successfully"
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "message": "Resume not found"
}
```

---

## 💳 Payment APIs

### 1. Create Payment Order
Create a Razorpay order for premium upgrade.

**Endpoint:** `POST /api/payments/create-order`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Request Body:**
```json
{
  "planType": "PREMIUM"
}
```

**Response:** `200 OK`
```json
{
  "orderId": "order_1234567890abcde",
  "amount": 29900,
  "currency": "INR"
}
```

**Error Responses:**
```json
// 400 Bad Request - Invalid plan type
{
  "message": "Invalid plan type"
}
```

---

### 2. Verify Payment
Verify Razorpay payment signature and upgrade user to premium.

**Endpoint:** `POST /api/payments/verify`

**Request Body:**
```json
{
  "razorpay_order_id": "order_1234567890abcde",
  "razorpay_payment_id": "pay_1234567890abcde",
  "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "subscriptionPlan": "Premium"
}
```

**Error Responses:**
```json
// 400 Bad Request - Verification failed
{
  "success": false,
  "message": "Payment verification failed"
}
```

---

### 3. Get Payment History
Retrieve all payments made by the authenticated user.

**Endpoint:** `GET /api/payments/history`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Response:** `200 OK`
```json
[
  {
    "_id": "65a7f1b2c9d8e0f9a1b2c3d4",
    "userId": "507f1f77bcf86cd799439011",
    "razorpayOrderId": "order_1234567890abcde",
    "razorpayPaymentId": "pay_1234567890abcde",
    "amount": 29900,
    "currency": "INR",
    "status": "COMPLETED",
    "planType": "PREMIUM",
    "createdAt": "2025-01-15T10:30:00Z"
  }
]
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "message": "Unauthorized"
}
```

---

### 4. Get Order Details
Retrieve details of a specific payment order.

**Endpoint:** `GET /api/payments/order/{orderId}`

**Path Parameters:**
- `orderId` (string, required) - Razorpay Order ID

**Response:** `200 OK`
```json
{
  "_id": "65a7f1b2c9d8e0f9a1b2c3d4",
  "razorpayOrderId": "order_1234567890abcde",
  "amount": 29900,
  "currency": "INR",
  "status": "COMPLETED",
  "planType": "PREMIUM",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "message": "Order not found"
}
```

---

## 🎨 Templates APIs

### Get Available Templates
Retrieve all available resume templates.

**Endpoint:** `GET /api/templates`

**Headers:**
- `Authorization: Bearer {token}` (required)

**Response:** `200 OK`
```json
{
  "templates": [
    {
      "id": "Template01",
      "name": "Professional",
      "description": "Clean and professional resume template",
      "isPremium": false,
      "colorOptions": [
        ["#000000", "#FF6B6B", "#FFFFFF"],
        ["#1e3c72", "#2a5298", "#ffffff"]
      ]
    },
    {
      "id": "Template02",
      "name": "Modern",
      "description": "Modern and creative resume template",
      "isPremium": true,
      "colorOptions": [
        ["#667eea", "#764ba2", "#ffffff"]
      ]
    }
  ]
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "message": "Unauthorized"
}
```

---

## 📧 Email APIs

### Send Resume via Email
Send resume as PDF attachment via email.

**Endpoint:** `POST /api/email/send-resume`

**Headers:**
- `Authorization: Bearer {token}` (required)
- `Content-Type: multipart/form-data`

**Form Data:**
- `recipientEmail` (string, required) - Email address to send resume to
- `subject` (string, required) - Email subject
- `message` (string, optional) - Email body message
- `resumePdf` (file, required) - PDF file of resume

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Resume sent successfully to recipient@example.com"
}
```

**Error Responses:**
```json
// 400 Bad Request - Missing fields
{
  "message": "Recipient email and PDF file are required"
}

// 500 Internal Server Error - Email sending failed
{
  "message": "Failed to send email"
}
```

---

## ⚠️ Error Responses

### Standard Error Format
```json
{
  "message": "Error description",
  "errors": ["Specific error 1", "Specific error 2"],
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| **Unauthorized** | Missing/invalid JWT token | Login again and get new token |
| **Email already exists** | Email already registered | Use different email or login |
| **Invalid credentials** | Wrong email/password | Check email and password |
| **Token expired** | JWT token has expired | Login again |
| **File size exceeds limit** | File > 5MB | Use smaller file |
| **Invalid file format** | Unsupported file type | Use JPG, PNG, or WebP |
| **Resource not found** | ID doesn't exist | Check if resource ID is correct |

---

## 📊 Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| **200** | OK | Successful GET, PUT requests |
| **201** | Created | Successful POST request (new resource created) |
| **400** | Bad Request | Invalid input data or validation failed |
| **401** | Unauthorized | Missing or invalid JWT token |
| **403** | Forbidden | Authenticated but not authorized for resource |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Resource already exists (e.g., email) |
| **413** | Payload Too Large | File size exceeds limit |
| **500** | Server Error | Unexpected server error |

---

## 🔑 Common Request Headers

```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
Accept: application/json
```

## 📌 Example Complete Request

```bash
curl -X GET http://localhost:8080/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

---

## 🧪 Testing with Swagger UI

1. Go to `http://localhost:8080/swagger-ui.html`
2. Click on any endpoint to expand it
3. Click "Try it out"
4. For authenticated endpoints, click the 🔒 lock icon
5. Paste your JWT token
6. Enter required parameters
7. Click "Execute"

---

## 📞 Need Help?

- Check Swagger UI for interactive endpoint documentation
- Review error messages for specific issues
- Verify all required fields are provided
- Ensure JWT token is valid and not expired
- Check backend logs for detailed error information

---

**Last Updated:** January 2025  
**API Version:** 1.0
