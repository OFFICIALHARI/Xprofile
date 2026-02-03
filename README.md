# Resume Builder - MERN Stack with Spring Boot

A full-stack **Resume Builder** application that allows users to create, customize, download, and share professional resumes with live preview, multiple templates, and premium features.

> **⚠️ IMPORTANT:** Before running this project, you must configure environment variables. See [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) for detailed instructions.

---

## 🚀 Features

✅ **User Authentication** - Secure registration & login with JWT  
✅ **Resume Creation & Management** - Create multiple resumes with full customization  
✅ **Live Preview** - Real-time resume preview as you type  
✅ **Multiple Templates** - Choose from professional resume templates  
✅ **Custom Themes** - Personalize color schemes for each template  
✅ **PDF Export** - Download resume as PDF file  
✅ **Email Sharing** - Send resume directly via email with PDF attachment  
✅ **Premium Features** - Unlock advanced features with premium subscription  
✅ **Profile Image Upload** - Upload and store profile pictures on Cloudinary  
✅ **Payment Integration** - Razorpay integration for premium payments  
✅ **Email Verification** - Secure email verification during registration  

---

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Next-generation build tool  
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client with JWT interceptor
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Lucide Icons** - Beautiful icon library

### Backend
- **Spring Boot 3.2** - Java framework for REST APIs
- **MongoDB** - NoSQL database for document storage
- **JWT (JSON Web Tokens)** - Stateless authentication
- **Cloudinary** - Cloud storage for image uploads
- **Razorpay** - Payment gateway integration
- **Spring Mail** - Email sending (SMTP)
- **Swagger/OpenAPI** - API documentation

### Infrastructure
- **Localhost Development** - Both frontend and backend run locally
- **MongoDB Local/Atlas** - Database storage

---

## 📦 API Documentation

### 🌐 Access Swagger UI
Once the backend is running, open your browser and go to:
```
http://localhost:8080/swagger-ui.html
```

This will show all available API endpoints with interactive documentation.

### 📋 API Endpoints Overview

#### Authentication APIs (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Create new user account |
| POST | `/login` | User login, returns JWT token |
| GET | `/verify-email?token=xxx` | Verify email with token |
| POST | `/upload-image` | Upload profile picture |
| GET | `/profile` | Get logged-in user's profile |
| PUT | `/profile` | Update user profile |
| POST | `/resend-verification` | Resend verification email |

#### Resume APIs (`/api/resumes`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create new resume |
| GET | `/` | Get all user's resumes |
| GET | `/{id}` | Get specific resume by ID |
| PUT | `/{id}` | Update resume |
| PUT | `/{id}/upload-images` | Upload resume thumbnail & profile images |
| DELETE | `/{id}` | Delete resume |

#### Payment APIs (`/api/payments`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create-order` | Create Razorpay payment order |
| POST | `/verify` | Verify payment and upgrade to premium |
| GET | `/history` | Get user's payment history |
| GET | `/order/{orderId}` | Get specific order details |

#### Template APIs (`/api/templates`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get available resume templates |

#### Email APIs (`/api/email`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/send-resume` | Send resume via email with PDF attachment |

---

## ⚙️ Setup & Configuration

### Prerequisites
- Node.js (v18+) and npm
- Java 21
- Maven
- MongoDB (local or Atlas connection)

### Environment Variables

#### Backend Setup
Create a `.env` file in the `ResumeBuilderBackend` directory or update `application.properties`:

```properties
# Database
spring.data.mongodb.uri=mongodb://localhost:27017/ResumeBuilder

# JWT Configuration
jwt.secret=your-secret-key-change-in-production
jwt.expiration=604800000

# Cloudinary (Image Upload)
cloudinary.cloud-name=your-cloudinary-name
cloudinary.api-key=your-api-key
cloudinary.api-secret=your-api-secret

# Email Configuration (Brevo SMTP)
spring.mail.host=smtp-relay.brevo.com
spring.mail.port=587
spring.mail.username=your-email@smtp-brevo.com
spring.mail.password=your-smtp-password
app.mail.from=your-sender-email@gmail.com

# Razorpay (Payment Gateway)
razorpay.key.id=your-razorpay-key-id
razorpay.key.secret=your-razorpay-key-secret

# Application URL
app.base-url=http://localhost:8080
```

#### Frontend Setup
Create a `.env` file in the `resume-builder-frontend` directory:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## ▶️ How to Run Locally

### 1️⃣ Start MongoDB
Make sure MongoDB is running (local or Atlas):
```bash
# If using local MongoDB
mongod
```

### 2️⃣ Start Backend (Spring Boot)
```bash
cd ResumeBuilderBackend

# Using Maven
mvn spring-boot:run

# OR if you have Maven installed globally
mvn clean install
mvn spring-boot:run
```

Backend will start at: **http://localhost:8080**

Check Swagger UI: **http://localhost:8080/swagger-ui.html**

### 3️⃣ Start Frontend (React + Vite)
```bash
cd resume-builder-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start at: **http://localhost:5173**

---

## 📊 Project Structure

```
ResumeBuilderFinal/
├── resume-builder-frontend/          # React Frontend
│   ├── src/
│   │   ├── components/               # React components
│   │   ├── pages/                    # Page components
│   │   ├── context/                  # React context (Theme)
│   │   ├── utils/                    # API utilities
│   │   └── assets/                   # Images, fonts
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── ResumeBuilderBackend/             # Spring Boot Backend
    ├── src/main/java/com/resume/builder/
    │   ├── controller/               # REST API controllers
    │   ├── service/                  # Business logic
    │   ├── repository/               # MongoDB repositories
    │   ├── document/                 # MongoDB documents (models)
    │   ├── dto/                      # Data Transfer Objects
    │   ├── config/                   # Configuration classes
    │   ├── exception/                # Exception handling
    │   └── security/                 # JWT security
    ├── src/main/resources/
    │   └── application.properties    # Configuration
    └── pom.xml                       # Maven dependencies
```

---

## 🔐 Authentication Flow

1. **User Registration**
   - User provides: Name, Email, Password, Optional Profile Picture
   - Verification email sent automatically
   - User must verify email to complete registration

2. **Email Verification**
   - Verification link sent to email
   - User clicks link to verify email
   - Account becomes active

3. **Login**
   - User enters email and password
   - Backend validates credentials
   - JWT token returned and stored in localStorage
   - Token automatically attached to all authenticated requests

4. **JWT Token Usage**
   - Every API request includes: `Authorization: Bearer {token}`
   - Axios interceptor handles this automatically
   - Token expires after 7 days (configurable)

---

## 💳 Payment Integration

### Premium Features
- Unlock premium templates
- Unlimited resume storage
- Advanced customization options

### Payment Flow
1. User clicks "Upgrade to Premium"
2. Backend creates Razorpay order
3. Razorpay checkout modal opens
4. User completes payment
5. Backend verifies payment signature
6. User's subscription updated to "Premium"

---

## 📁 Resume Data Structure

```javascript
{
  _id: String,                    // Unique ID
  userId: String,                 // Owner's user ID
  title: String,                  // Resume title
  template: {
    theme: String,                // Template name (Template01, etc)
    colorPalette: [String]        // Custom colors
  },
  profileInfo: {
    fullName: String,
    designation: String,
    summary: String,
    profileImageUrl: String
  },
  contactInfo: {
    email: String,
    phone: String,
    location: String,
    linkedIn: String,
    github: String,
    website: String
  },
  workExperience: [
    {
      company: String,
      role: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ],
  education: [
    {
      degree: String,
      institution: String,
      startDate: String,
      endDate: String
    }
  ],
  skills: [
    {
      name: String,
      proficiency: Number           // 0-100
    }
  ],
  projects: [
    {
      title: String,
      description: String,
      github: String,
      liveDemo: String
    }
  ],
  certifications: [
    {
      title: String,
      issuer: String,
      year: String
    }
  ],
  languages: [
    {
      language: String,
      proficiency: String           // Basic, Intermediate, Fluent
    }
  ],
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:8080`
- Check `VITE_API_BASE_URL` in `.env` file
- Look for CORS errors in browser console

### MongoDB connection error
- Verify MongoDB is running locally or Atlas URL is correct
- Check `spring.data.mongodb.uri` in `application.properties`
- Ensure database name matches (`ResumeBuilder`)

### JWT token expired
- Clear localStorage and login again
- Check `jwt.expiration` value (currently 7 days)

### Email not sending
- Verify SMTP credentials in `application.properties`
- Check firewall/antivirus isn't blocking port 587
- Ensure Brevo account has sufficient credits

### Cloudinary upload failing
- Verify Cloudinary credentials are correct
- Check file size doesn't exceed 5MB limit
- Ensure file format is supported (JPG, PNG, etc)

---

## 📝 Example API Requests

### Register User
```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Login
```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "subscriptionPlan": "Basic"
  }
}
```

### Create Resume
```bash
POST http://localhost:8080/api/resumes
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My Professional Resume",
  "template": "Template01",
  "colorPalette": ["#000000", "#FF6B6B", "#FFFFFF"]
}
```

### Get All Resumes
```bash
GET http://localhost:8080/api/resumes
Authorization: Bearer {token}
```

---

## 🚀 Deployment (Optional)

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
```bash
# Configure environment variables
# Deploy jar file
java -jar ResumeBuilder-0.0.1-SNAPSHOT.jar
```

---

## 👨‍💻 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@resumebuilder.com

---

## 🎉 Built With ❤️

Made with React, Spring Boot, and MongoDB for creating awesome resumes!

**Happy Resume Building!** 🚀
