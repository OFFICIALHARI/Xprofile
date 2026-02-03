# Resume Builder - Developer Setup Guide

Complete step-by-step instructions to set up and run the Resume Builder project locally.

---

## ✅ Prerequisites

Before you start, ensure you have installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Java 21** - [Download](https://www.oracle.com/java/technologies/downloads/#java21)
- **Maven** (v3.8+) - Usually comes with Java IDE
- **MongoDB** - [Local Installation](https://docs.mongodb.com/manual/installation/) or [Atlas Cloud](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```bash
# Check Node.js version
node --version
npm --version

# Check Java version
java -version

# Check Maven version
mvn --version

# Check MongoDB (if local)
mongod --version
```

---

## 📝 Configuration Files

### 1. Backend Configuration

#### Step 1: Navigate to Backend
```bash
cd ResumeBuilderBackend
```

#### Step 2: Update application.properties
Edit `src/main/resources/application.properties`:

```properties
# ===============================
# Database Configuration
# ===============================
spring.data.mongodb.uri=mongodb://localhost:27017/ResumeBuilder
# OR for MongoDB Atlas:
# spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/ResumeBuilder?retryWrites=true&w=majority

# ===============================
# Application Info
# ===============================
app.base-url=http://localhost:8080

# ===============================
# JWT Configuration (IMPORTANT: Change in production!)
# ===============================
jwt.secret=change-this-secret-in-production-very-long-key-at-least-32-characters
jwt.expiration=604800000  # 7 days in milliseconds

# ===============================
# Cloudinary Configuration (Image Upload)
# ===============================
cloudinary.cloud-name=your-cloudinary-name
cloudinary.api-key=your-api-key
cloudinary.api-secret=your-api-secret

# ===============================
# Email Configuration (Brevo SMTP)
# ===============================
spring.mail.host=smtp-relay.brevo.com
spring.mail.port=587
spring.mail.username=your-email@smtp-brevo.com
spring.mail.password=your-smtp-password
app.mail.from=your-sender-email@gmail.com

spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.protocol=smtp

# ===============================
# Multipart File Upload Configuration
# ===============================
spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB

# ===============================
# Razorpay Configuration (Payment Gateway)
# ===============================
razorpay.key.id=rzp_test_xxxxx  # Test key (change to live in production)
razorpay.key.secret=xxxxx_key_secret
```

#### How to Get Configuration Keys

**Cloudinary Setup:**
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Go to Dashboard
4. Copy: Cloud Name, API Key, API Secret

**Brevo Email Setup:**
1. Go to [Brevo](https://www.brevo.com/)
2. Sign up for free account
3. Go to Settings → SMTP & API
4. Copy SMTP credentials

**Razorpay Setup:**
1. Go to [Razorpay](https://razorpay.com/)
2. Create merchant account
3. Go to Settings → API Keys
4. Copy Test Key ID and Secret (for development)

---

### 2. Frontend Configuration

#### Step 1: Navigate to Frontend
```bash
cd resume-builder-frontend
```

#### Step 2: Create .env File
Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Resume Builder
```

#### Step 3: Install Dependencies
```bash
npm install
```

This will install all required packages:
- React 19
- Vite
- Tailwind CSS
- Axios
- React Router
- And more...

---

## 🚀 Running the Application

### Method 1: Start MongoDB (Local Setup)

If using MongoDB locally:

```bash
# On Windows (in MongoDB bin folder)
mongod

# On macOS (using Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

Verify MongoDB is running:
```bash
# Should connect to MongoDB shell
mongo
# or
mongosh
```

---

### Method 2: Start Backend (Spring Boot)

```bash
cd ResumeBuilderBackend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

Or with your IDE (IntelliJ, Eclipse, VS Code):
- Open `ResumeBuilderApplication.java`
- Click "Run" button

**Expected output:**
```
Started ResumeBuilderApplication in 8.5 seconds
Listening on port 8080
```

✅ Backend running at: **http://localhost:8080**  
✅ Swagger UI at: **http://localhost:8080/swagger-ui.html**

---

### Method 3: Start Frontend (React + Vite)

Open a **new terminal** window:

```bash
cd resume-builder-frontend

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

**Expected output:**
```
VITE v5.2.4  ready in 487 ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

✅ Frontend running at: **http://localhost:5173**

---

## 🧪 Test the Application

### 1. Landing Page
- Open browser: `http://localhost:5173`
- Should see hero section with CTA buttons

### 2. Register New User
- Click "Sign Up"
- Fill in form
- Click "Register"
- Check email for verification link
- Click link to verify

### 3. Login
- Click "Sign In"
- Enter email and password
- Should redirect to Dashboard

### 4. Create Resume
- Click "Create New Resume"
- Enter resume title
- Click "Create"
- Start filling resume details

### 5. Test API Directly
Open: `http://localhost:8080/swagger-ui.html`
- Expand Authentication section
- Click "Try it out"
- Test register, login endpoints

---

## 📊 Project Build

### Frontend Build (Production)

```bash
cd resume-builder-frontend

# Build for production
npm run build

# Output in 'dist' folder
# Ready to deploy to Vercel, Netlify, etc.
```

### Backend Build (Production)

```bash
cd ResumeBuilderBackend

# Build JAR file
mvn clean package

# JAR file created at:
# target/ResumeBuilder-0.0.1-SNAPSHOT.jar

# Run JAR:
java -jar target/ResumeBuilder-0.0.1-SNAPSHOT.jar
```

---

## 🔧 Environment Setup for Different OS

### Windows

```bash
# MongoDB
# Download from https://www.mongodb.com/try/download/community
# Run installer and follow instructions

# Java 21
# Download from Oracle, run installer

# Maven
# Download from https://maven.apache.org/download.cgi
# Extract and add to PATH

# Node.js
# Download from https://nodejs.org/
# Run installer
```

### macOS

```bash
# Using Homebrew (install first: https://brew.sh/)

# MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Java 21
brew install openjdk@21

# Maven
brew install maven

# Node.js
brew install node
```

### Linux (Ubuntu/Debian)

```bash
# Update packages
sudo apt update

# MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
sudo apt-get install -y mongodb

# Java 21
sudo apt install openjdk-21-jdk

# Maven
sudo apt install maven

# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Port 8080 Already in Use
```bash
# Find process using port 8080
# Windows
netstat -ano | findstr :8080

# macOS/Linux
lsof -i :8080

# Kill process (replace PID)
# Windows
taskkill /PID 12345 /F

# macOS/Linux
kill -9 12345
```

### Issue 2: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

Solution:
- Ensure MongoDB is running: `mongod`
- Check connection string in `application.properties`
- If using Atlas, verify network access

### Issue 3: JWT Secret Too Short
```
Error: JWT Secret must be at least 32 characters
```

Solution:
- Update `jwt.secret` in `application.properties` with longer string

### Issue 4: Cloudinary Upload Fails
```
Error: Failed to upload image to Cloudinary
```

Solution:
- Verify Cloudinary credentials are correct
- Check file size (max 5MB)
- Ensure file format is supported

### Issue 5: Email Not Sending
```
Error: Failed to send email via SMTP
```

Solution:
- Verify Brevo SMTP credentials
- Ensure internet connection
- Check firewall isn't blocking port 587

### Issue 6: CORS Error in Frontend
```
Error: Access to XMLHttpRequest blocked by CORS policy
```

Solution:
- Backend should have CORS enabled (usually by default)
- Verify frontend API URL is correct
- Check `VITE_API_BASE_URL` in `.env`

---

## 📚 Project Structure Overview

```
ResumeBuilderFinal/
├── README.md                          # Main project readme
├── API_DOCUMENTATION.md               # API documentation
│
├── resume-builder-frontend/           # React Frontend
│   ├── src/
│   │   ├── components/                # React components
│   │   │   ├── CustomModal.jsx
│   │   │   ├── ResumeForm.jsx
│   │   │   ├── ResumePreview.jsx
│   │   │   └── ...
│   │   ├── pages/                     # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ResumeBuilder.jsx
│   │   │   └── ...
│   │   ├── context/                   # React Context
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/                     # Utility functions
│   │   │   └── api.js                 # Axios API client
│   │   └── main.jsx                   # Entry point
│   ├── package.json                   # Dependencies
│   ├── vite.config.js                 # Vite config
│   ├── tailwind.config.js             # Tailwind config
│   └── .env                           # Environment variables
│
├── ResumeBuilderBackend/              # Spring Boot Backend
│   ├── src/main/java/com/resume/builder/
│   │   ├── controller/                # REST Controllers
│   │   │   ├── AuthController.java
│   │   │   ├── ResumeController.java
│   │   │   ├── PaymentController.java
│   │   │   └── ...
│   │   ├── service/                   # Business Logic
│   │   ├── repository/                # Data Access Layer
│   │   ├── document/                  # MongoDB Models
│   │   ├── dto/                       # Data Transfer Objects
│   │   ├── config/                    # Configuration Classes
│   │   ├── exception/                 # Exception Handling
│   │   ├── security/                  # JWT Security
│   │   └── ResumeBuilderApplication.java  # Entry Point
│   ├── src/main/resources/
│   │   └── application.properties     # Configuration
│   ├── pom.xml                        # Maven Dependencies
│   └── target/                        # Build artifacts (auto-generated)
```

---

## 🔒 Security Notes

### Before Production Deployment

1. **Change JWT Secret**
   ```properties
   jwt.secret=YOUR_VERY_LONG_RANDOM_STRING_AT_LEAST_32_CHARS
   ```

2. **Change Razorpay Keys to Live Keys**
   ```properties
   razorpay.key.id=rzp_live_xxxxx    # NOT test key
   razorpay.key.secret=xxxxx         # Live secret
   ```

3. **Secure MongoDB**
   - Enable authentication
   - Use strong password
   - Restrict network access

4. **Environment Variables**
   - Never commit `.env` files with secrets
   - Use environment variable management tools
   - Use different keys for dev/prod

5. **HTTPS**
   - Always use HTTPS in production
   - Install SSL certificate

---

## 📞 Support & Troubleshooting

### Useful Commands

```bash
# Clear Maven cache (if build fails)
mvn clean

# Update Maven dependencies
mvn update-sources

# Check Node packages for updates
npm outdated

# Update all npm packages
npm update

# Clear npm cache
npm cache clean --force
```

### Debug Logs

**Backend** - Check `target/logs/` folder  
**Frontend** - Check browser DevTools Console  
**MongoDB** - Check MongoDB logs

---

## 🎉 Next Steps

Once everything is running:

1. ✅ Explore API endpoints in Swagger UI
2. ✅ Create test resume
3. ✅ Test payment flow (use Razorpay test card)
4. ✅ Test email functionality
5. ✅ Review code structure
6. ✅ Start customization

---

## 📖 Documentation Files

- **README.md** - Project overview and features
- **API_DOCUMENTATION.md** - Complete API reference (Backend)
- **API_INTEGRATION_GUIDE.md** - Frontend integration guide
- **PROJECT_OVERVIEW.md** - Detailed project structure
- **THEME_IMPLEMENTATION.md** - Theme system guide
- **SETUP_GUIDE.md** - Setup instructions

---

## 🚀 You're Ready!

Your Resume Builder is now set up and running locally. 

**Happy Coding!** 🎉

Need help? Check the documentation files or review the API endpoints in Swagger UI.
