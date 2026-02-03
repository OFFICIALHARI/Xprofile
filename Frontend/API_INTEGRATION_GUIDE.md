# API Integration Guide for Frontend

This guide explains how to use the Resume Builder APIs in your React frontend.

---

## 📌 Quick Start

### Base Configuration

```javascript
// Base URL for all API calls
const BASE_URL = 'http://localhost:8080/api';

// Authorization header format
// Authorization: Bearer {JWT_TOKEN}
```

### API Client Setup (utils/api.js)

The project uses **Axios** with JWT interceptor for automatic token attachment:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 🔐 Authentication

### Register User

```javascript
import api from '../utils/api';

const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123'
    });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response.data);
  }
};
```

### Login

```javascript
const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email: email,
      password: password
    });
    
    // Store JWT token
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
};
```

### Verify Email

```javascript
const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    console.error('Email verification failed:', error.response.data);
  }
};
```

### Upload Profile Image

```javascript
const uploadProfileImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/auth/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data.imageUrl;
  } catch (error) {
    console.error('Image upload failed:', error.response.data);
  }
};
```

### Get Current User Profile

```javascript
const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data.user;
  } catch (error) {
    console.error('Failed to fetch profile:', error.response.data);
  }
};
```

### Update User Profile

```javascript
const updateProfile = async (updateData) => {
  try {
    const response = await api.put('/auth/profile', updateData);
    return response.data.user;
  } catch (error) {
    console.error('Profile update failed:', error.response.data);
  }
};
```

### Resend Verification Email

```javascript
const resendVerificationEmail = async (email) => {
  try {
    const response = await api.post('/auth/resend-verification', {
      email: email
    });
    return response.data;
  } catch (error) {
    console.error('Failed to resend verification:', error.response.data);
  }
};
```

---

## 📄 Resume Management

### Create Resume

```javascript
const createResume = async (title, template = 'Template01') => {
  try {
    const response = await api.post('/resumes', {
      title: title,
      template: template
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create resume:', error.response.data);
  }
};
```

### Get All User Resumes

```javascript
const getUserResumes = async () => {
  try {
    const response = await api.get('/resumes');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch resumes:', error.response.data);
  }
};
```

### Get Single Resume by ID

```javascript
const getResumeById = async (resumeId) => {
  try {
    const response = await api.get(`/resumes/${resumeId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch resume:', error.response.data);
  }
};
```

### Update Resume

```javascript
const updateResume = async (resumeId, updateData) => {
  try {
    const response = await api.put(`/resumes/${resumeId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Failed to update resume:', error.response.data);
  }
};

// Example usage:
const resumeData = {
  title: 'Updated Resume',
  profileInfo: {
    fullName: 'John Doe',
    designation: 'Senior Developer',
    summary: 'Experienced developer...'
  },
  workExperience: [
    {
      company: 'Tech Corp',
      role: 'Senior Dev',
      startDate: '2022-01',
      endDate: 'present',
      description: 'Leading development team'
    }
  ]
};

await updateResume('resume-id-123', resumeData);
```

### Upload Resume Images

```javascript
const uploadResumeImages = async (resumeId, thumbnail, profileImage) => {
  try {
    const formData = new FormData();
    
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    
    const response = await api.put(
      `/resumes/${resumeId}/upload-images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Image upload failed:', error.response.data);
  }
};
```

### Delete Resume

```javascript
const deleteResume = async (resumeId) => {
  try {
    const response = await api.delete(`/resumes/${resumeId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete resume:', error.response.data);
  }
};
```

---

## 💳 Payment Integration

### Create Payment Order

```javascript
const createPaymentOrder = async () => {
  try {
    const response = await api.post('/payments/create-order', {
      planType: 'PREMIUM'
    });
    
    const { orderId, amount, currency } = response.data;
    
    // Open Razorpay checkout
    openRazorpayCheckout(orderId, amount, currency);
    
    return response.data;
  } catch (error) {
    console.error('Failed to create order:', error.response.data);
  }
};

// Razorpay checkout handler
const openRazorpayCheckout = (orderId, amount, currency) => {
  const options = {
    key: 'YOUR_RAZORPAY_KEY_ID', // Get from backend config
    amount: amount,
    currency: currency,
    order_id: orderId,
    handler: verifyPayment,
    prefill: {
      email: localStorage.getItem('user')?.email
    },
    theme: {
      color: '#FF6B6B'
    }
  };
  
  const rzp = new Razorpay(options);
  rzp.open();
};
```

### Verify Payment

```javascript
const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post('/payments/verify', {
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_signature: paymentData.razorpay_signature
    });
    
    if (response.data.success) {
      console.log('Payment verified! User upgraded to Premium');
      // Update user subscription in localStorage
      return response.data;
    }
  } catch (error) {
    console.error('Payment verification failed:', error.response.data);
  }
};
```

### Get Payment History

```javascript
const getPaymentHistory = async () => {
  try {
    const response = await api.get('/payments/history');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch payment history:', error.response.data);
  }
};
```

### Get Order Details

```javascript
const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`/payments/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order details:', error.response.data);
  }
};
```

---

## 🎨 Templates

### Get Available Templates

```javascript
const getAvailableTemplates = async () => {
  try {
    const response = await api.get('/templates');
    return response.data.templates;
  } catch (error) {
    console.error('Failed to fetch templates:', error.response.data);
  }
};
```

---

## 📧 Email

### Send Resume via Email

```javascript
const sendResumeEmail = async (recipientEmail, subject, message, pdfFile) => {
  try {
    const formData = new FormData();
    formData.append('recipientEmail', recipientEmail);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('resumePdf', pdfFile);
    
    const response = await api.post('/email/send-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to send email:', error.response.data);
  }
};
```

---

## 🔄 Complete Example: Resume Builder Flow

```javascript
// 1. Register
const register = async () => {
  const result = await registerUser({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123'
  });
  console.log('Registered, check your email for verification');
};

// 2. Verify Email (user clicks link in email)
const verifyFromEmail = async (token) => {
  await verifyEmail(token);
  console.log('Email verified, you can now login');
};

// 3. Login
const login = async () => {
  const result = await loginUser('john@example.com', 'SecurePass123');
  console.log('Logged in successfully, JWT token stored');
};

// 4. Get Profile
const getProfile = async () => {
  const user = await getUserProfile();
  console.log('Current user:', user);
};

// 5. Create Resume
const createNewResume = async () => {
  const resume = await createResume('My Professional Resume', 'Template01');
  console.log('Resume created:', resume._id);
  return resume._id;
};

// 6. Update Resume with Content
const addResumeContent = async (resumeId) => {
  const updatedResume = await updateResume(resumeId, {
    profileInfo: {
      fullName: 'John Doe',
      designation: 'Senior Developer',
      summary: 'Experienced full-stack developer with 5+ years experience'
    },
    workExperience: [
      {
        company: 'Tech Corp',
        role: 'Senior Developer',
        startDate: '2022-01',
        endDate: 'present',
        description: 'Leading backend team'
      }
    ]
  });
  console.log('Resume updated:', updatedResume);
};

// 7. Get All Resumes
const viewAllResumes = async () => {
  const resumes = await getUserResumes();
  console.log('Your resumes:', resumes);
};

// 8. Upgrade to Premium
const upgradeToPremium = async () => {
  await createPaymentOrder();
  // User completes Razorpay payment
  // Payment verification happens automatically
};

// 9. Send Resume via Email
const shareResume = async (resumeId) => {
  const pdfFile = generatePDF(resumeId); // Your PDF generation logic
  const result = await sendResumeEmail(
    'recipient@example.com',
    'Check out my resume',
    'I would love to discuss this opportunity',
    pdfFile
  );
  console.log('Email sent:', result.message);
};
```

---

## ⚠️ Error Handling

```javascript
import api from '../utils/api';

// Interceptor for global error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // User not authorized for this action
      console.error('Access denied');
    } else if (error.response?.status === 404) {
      // Resource not found
      console.error('Resource not found');
    } else if (error.response?.status === 409) {
      // Conflict (e.g., email already exists)
      console.error('Resource already exists');
    }
    return Promise.reject(error);
  }
);
```

---

## 🧪 Testing with Postman

1. Import endpoints into Postman
2. Set environment variable: `token` = JWT token from login
3. Add header to requests: `Authorization: Bearer {{token}}`
4. Test each endpoint

---

## 📞 Need Help?

- Check Swagger UI: `http://localhost:8080/swagger-ui.html`
- Review backend API documentation
- Check browser console for error messages
- Ensure backend is running on `http://localhost:8080`

---

**Last Updated:** January 2025
