# 🔒 Environment Setup Guide

## ⚠️ IMPORTANT: Before Running the Application

This project uses environment variables to keep sensitive information secure. You **must** set up environment variables before running the application.

---

## 🔧 Backend Setup (Spring Boot)

### 1. Create `.env` file in `ResumeBuilderBackend/` directory

```bash
cd ResumeBuilderBackend
cp .env.example .env
```

### 2. Edit `.env` with your actual credentials

```properties
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/ResumeBuilder

# Application Configuration
APP_BASE_URL=http://localhost:8080

# Mail Configuration (Brevo)
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USERNAME=your-actual-brevo-username
MAIL_PASSWORD=your-actual-brevo-password
MAIL_FROM=your-email@example.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
CLOUDINARY_API_KEY=your-actual-api-key
CLOUDINARY_API_SECRET=your-actual-api-secret

# JWT Configuration
JWT_SECRET=your-very-long-secret-key-at-least-256-bits-long
JWT_EXPIRATION=604800000

# Razorpay Configuration
RAZORPAY_KEY_ID=your-actual-razorpay-key-id
RAZORPAY_KEY_SECRET=your-actual-razorpay-key-secret
```

### 3. Load environment variables

**Option A: Using IntelliJ IDEA / Eclipse**
- Install the "EnvFile" plugin
- Configure it to load the `.env` file

**Option B: Using Terminal**
```bash
# Load .env variables (Linux/Mac)
export $(cat .env | xargs)

# Run the application
./mvnw spring-boot:run
```

**Option C: Using application-local.properties**
Create `src/main/resources/application-local.properties` and copy values from `.env`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/ResumeBuilder
jwt.secret=your-secret-here
# ... etc
```

Run with:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

---

## 🎨 Frontend Setup (React + Vite)

### 1. Create `.env` file in `resume-builder-frontend/` directory

```bash
cd resume-builder-frontend
cp .env.example .env
```

### 2. Edit `.env` with your backend URL

```properties
# For local development
VITE_API_BASE_URL=http://localhost:8080

# For production (update when deploying)
# VITE_API_BASE_URL=https://your-backend-url.com
```

### 3. Run the frontend

```bash
npm install
npm run dev
```

The frontend will automatically load environment variables prefixed with `VITE_`.

---

## 🚨 Security Checklist Before Pushing to GitHub

- [x] `.env` files are in `.gitignore`
- [x] `.env.example` files contain no real secrets
- [x] `application.properties` uses `${VARIABLE}` syntax
- [ ] Verify no secrets in git history: `git log --all --full-history --source -- "*application.properties"`
- [ ] Remove cached files if needed: `git rm --cached <file>`

---

## 📝 Verifying Your Setup

### Check Backend
```bash
cd ResumeBuilderBackend
./mvnw spring-boot:run
```
Look for successful startup without errors about missing properties.

### Check Frontend
```bash
cd resume-builder-frontend
npm run dev
```
Should connect to backend API successfully.

---

## 🚀 Deployment Notes

### For Production:

**Backend:**
- Set environment variables in your hosting platform (Heroku, AWS, Railway, etc.)
- Never commit `.env` files
- Use strong, unique secrets for production

**Frontend:**
- Update `VITE_API_BASE_URL` to your production backend URL
- Build with: `npm run build`
- Deploy the `dist` folder

---

## ❓ Troubleshooting

**Issue:** "Could not resolve placeholder" error
- **Solution:** Ensure all variables in `application.properties` are defined in your `.env` file

**Issue:** Frontend can't connect to backend
- **Solution:** Check `VITE_API_BASE_URL` is correct and backend is running

**Issue:** Still seeing sensitive data in Git
- **Solution:** 
  ```bash
  # Remove from cache
  git rm --cached ResumeBuilderBackend/src/main/resources/application.properties
  
  # Commit the removal
  git commit -m "Remove sensitive data"
  
  # Re-add the cleaned version
  git add ResumeBuilderBackend/src/main/resources/application.properties
  git commit -m "Add cleaned application.properties"
  ```

---

## 📚 Additional Resources

- [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Best Practices for API Keys](https://cloud.google.com/docs/authentication/api-keys)
