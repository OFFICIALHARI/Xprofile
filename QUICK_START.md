# 🚀 Quick Start Guide - 5 Minutes

Get Resume Builder running in 5 minutes!

---

## ⚡ Prerequisites (Already Have?)

- ✅ Node.js 18+
- ✅ Java 21
- ✅ MongoDB running (local or Atlas)
- ✅ Maven

If not installed, follow `DEVELOPER_SETUP_GUIDE.md`

---

## 📝 Step 1: Backend Configuration (1 min)

### Edit Backend Config
```bash
cd ResumeBuilderBackend
```

Open `src/main/resources/application.properties` and update:

```properties
# Database
spring.data.mongodb.uri=mongodb://localhost:27017/ResumeBuilder

# JWT (change in production!)
jwt.secret=your-secret-key-at-least-32-characters

# Add your Cloudinary credentials
cloudinary.cloud-name=your-name
cloudinary.api-key=your-key
cloudinary.api-secret=your-secret

# Add your Email credentials
spring.mail.username=your-email@smtp-brevo.com
spring.mail.password=your-password

# Add your Razorpay test keys
razorpay.key.id=rzp_test_xxxxx
razorpay.key.secret=xxxxx
```

---

## 🗄️ Step 2: Start MongoDB (1 min)

### Option A: Local MongoDB
```bash
mongod
```

### Option B: MongoDB Atlas (Cloud)
Skip this step if using cloud database

---

## 🔧 Step 3: Start Backend (1 min)

Open **Terminal 1**:
```bash
cd ResumeBuilderBackend
mvn spring-boot:run
```

Wait for: `Listening on port 8080`

✅ Backend ready at `http://localhost:8080`  
✅ Swagger UI at `http://localhost:8080/swagger-ui.html`

---

## 💻 Step 4: Start Frontend (1 min)

Open **Terminal 2**:
```bash
cd resume-builder-frontend
npm install
npm run dev
```

Wait for: `Local: http://localhost:5173/`

✅ Frontend ready at `http://localhost:5173`

---

## 🎉 Step 5: Test It! (1 min)

### Option A: Use Web Interface
1. Go to `http://localhost:5173`
2. Click "Sign Up"
3. Register with email
4. Verify email (check console or integration guide)
5. Login and create resume

### Option B: Test APIs with Swagger
1. Go to `http://localhost:8080/swagger-ui.html`
2. Try POST `/auth/register`
3. Try POST `/auth/login`
4. Get JWT token
5. Try authenticated endpoints

---

## 📚 Want More Details?

- **Setup Issues?** → Read `DEVELOPER_SETUP_GUIDE.md`
- **API Questions?** → Check `API_DOCUMENTATION.md`
- **Frontend Code?** → See `API_INTEGRATION_GUIDE.md`
- **Project Overview?** → Read main `README.md`

---

## 🆘 Common Issues (Quick Fixes)

### Backend won't start
```bash
# Make sure MongoDB is running
mongod

# Kill port 8080 if in use (Windows)
netstat -ano | findstr :8080
taskkill /PID xxxx /F
```

### Frontend won't load
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install
npm run dev
```

### Can't connect frontend to backend
- Check `VITE_API_BASE_URL=http://localhost:8080/api` in `.env`
- Ensure backend is running on 8080

### Email/Upload not working
- Add Cloudinary credentials in `application.properties`
- Add Brevo email credentials

---

## 🎯 Next Steps

1. ✅ Explore API in Swagger UI
2. ✅ Create a test resume
3. ✅ Try payment flow (Razorpay test mode)
4. ✅ Review code structure
5. ✅ Read full documentation

---

## 📋 Terminal Commands Reference

```bash
# Backend
cd ResumeBuilderBackend
mvn clean install          # Build
mvn spring-boot:run        # Run
mvn clean                  # Clean

# Frontend
cd resume-builder-frontend
npm install                # Install dependencies
npm run dev                # Development server
npm run build              # Production build
npm run preview            # Preview build

# MongoDB (if local)
mongod                     # Start MongoDB
mongo                      # Connect to MongoDB shell
```

---

## 🔗 Important URLs

| What | URL |
|------|-----|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:8080/api` |
| Swagger UI | `http://localhost:8080/swagger-ui.html` |
| MongoDB (local) | `mongodb://localhost:27017` |

---

## ✨ You're Ready!

Both frontend and backend should now be running.

**Happy building!** 🚀

---

Need help? Check `DEVELOPER_SETUP_GUIDE.md` for detailed instructions.
