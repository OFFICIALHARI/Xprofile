#!/bin/bash

# Resume Builder Frontend - Quick Start Script

echo "🚀 Resume Builder Frontend - Quick Start"
echo "========================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
    echo ""
fi

echo "🔧 Configuration Checklist:"
echo "1. Backend running on http://localhost:8080? (Y/n)"
echo "2. MongoDB connected?"
echo "3. Cloudinary configured?"
echo "4. Razorpay keys set?"
echo ""

echo "📝 Quick Commands:"
echo "  npm run dev      - Start development server"
echo "  npm run build    - Build for production"
echo "  npm run preview  - Preview production build"
echo ""

echo "🌐 Starting development server..."
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:8080"
echo ""

npm run dev
