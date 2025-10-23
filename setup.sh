#!/bin/bash

# Backend MVC Template - Quick Setup Script
# This script helps users quickly set up the backend template

echo "🚀 Backend MVC Template - Quick Setup"
echo "===================================="

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created!"
    echo "⚠️  Please update .env file with your MongoDB URI and JWT secret"
else
    echo "✅ .env file already exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Run 'npm run dev' to start development server"
echo "3. Run 'npm start' to start production server"
echo ""
echo "Happy coding! 🚀"
