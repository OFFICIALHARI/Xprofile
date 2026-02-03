import axios from 'axios';

// Create Axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Don't override Content-Type for FormData - let axios set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  verifyEmail: (token) => api.get(`/auth/verify-email?token=${token}`),
  uploadImage: (formData) => api.post('/auth/upload-image', formData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  resendVerification: (email) => api.post('/auth/resend-verification', { email }),
};

// Resume API calls
export const resumeAPI = {
  createResume: (data) => api.post('/resumes', data),
  getUserResumes: () => api.get('/resumes'),
  getResumeById: (id) => api.get(`/resumes/${id}`),
  updateResume: (id, data) => api.put(`/resumes/${id}`, data),
  deleteResume: (id) => api.delete(`/resumes/${id}`),
  uploadImages: (id, formData) => api.put(`/resumes/${id}/upload-images`, formData),
};

// Payment API calls
export const paymentAPI = {
  createOrder: (planType) => api.post('/payments/create-order', { planType }),
  verifyPayment: (data) => api.post('/payments/verify', data),
  getPaymentHistory: () => api.get('/payments/history'),
  getOrderDetails: (orderId) => api.get(`/payments/order/${orderId}`),
};

// Templates API calls
export const templatesAPI = {
  getTemplates: () => api.get('/templates'),
};

// Email API calls
export const emailAPI = {
  sendResume: (formData) => api.post('/email/send-resume', formData),
};

export default api;
