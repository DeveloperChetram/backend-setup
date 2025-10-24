# Backend MVC Template

[![Version: 1.0.0-beta](https://img.shields.io/badge/version-1.0.0--beta-blue.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A complete backend API template following MVC architecture with Node.js, Express.js, MongoDB, and JWT authentication. Perfect for rapid backend development and learning MVC patterns.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.0.0 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### Method 1: Using NPX (Recommended)

```bash
# Create a new backend project with npx (no installation needed!)
npx create-mvc-backend-app my-awesome-backend
```
**Project Name Options:**
- **Enter a name** (e.g., `my-backend`): Creates a new directory with that name
- **Enter `.`**: Uses the current directory (like Vite)

**Alternative Usage:**
```bash
# Run without project name (will prompt you)
npx create-mvc-backend-app

# Use current directory
npx create-mvc-backend-app .
```


**What happens when you run the command:**
```
🚀 MVC Backend App Generator
============================
Project name: my-awesome-backend

📁 Creating project: my-awesome-backend
📂 Created directory: my-awesome-backend
✅ Copied src
✅ Copied server.js
✅ Copied env.example
✅ Copied README.md
✅ Copied LICENSE
✅ Created package.json

🎉 Project created successfully!

Next steps:
1. cd my-awesome-backend
2. npm install
3. cp env.example .env
4. Update .env with your MongoDB URI and JWT secret
5. npm run dev

Happy coding! 🚀
```


### Method 2: Clone from GitHub (Without npm)

```bash
# Clone the repository
git clone https://github.com/DeveloperChetram/backend-setup.git my-backend-project

# Navigate to the project directory
cd my-backend-project

# Install dependencies
npm install
```

## ⚙️ Setup & Configuration

### 1. Environment Variables

```bash
# Copy the environment template
cp env.example .env
```

### 2. Configure Environment Variables

Update your `.env` file with the following:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/your-database-name
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database-name

# JWT Secret (generate a strong secret key)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Cookie Configuration
COOKIE_EXPIRES_IN=5d
```

### 3. MongoDB Setup

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/your-database-name` in your `.env`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `<password>` and `<dbname>` in the connection string
5. Use the connection string in your `.env`

### 4. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000` (or your specified PORT).

## ✨ Features

- ✅ **User Registration** - Complete user signup with validation
- ✅ **User Login** - Secure authentication with JWT
- ✅ **User Logout** - Proper session termination
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **HTTP-only Cookies** - XSS protection
- ✅ **Password Hashing** - bcryptjs security
- ✅ **Input Validation** - Server-side validation
- ✅ **Error Handling** - Consistent error responses
- ✅ **CORS Configuration** - Cross-origin support
- ✅ **MongoDB Integration** - Mongoose ODM
- ✅ **MVC Architecture** - Clean code organization

## 📁 Project Structure

```
backend-mvc-template/
├── src/
│   ├── controllers/          # Request handlers
│   │   └── auth.controllers.js
│   ├── models/               # Database schemas
│   │   └── user.model.js
│   ├── routes/               # API route definitions
│   │   └── auth.routes.js
│   ├── middlewares/          # Cross-cutting concerns
│   │   └── auth.middleware.js
│   ├── db/                   # Database connection
│   │   └── db.js
│   ├── utils/                # Utility functions
│   │   └── cookieOptions.js
│   └── app.js                # Express app configuration
├── server.js                 # Server entry point
├── package.json              # Dependencies and scripts
├── env.example               # Environment variables template
└── README.md                 # This file
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | `{ name, email, password }` |
| POST | `/api/auth/login` | Login user | `{ email, password }` |
| GET | `/api/auth/logout` | Logout user | - |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server health check |
| GET | `/api/health` | Server health check |



## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Example Usage

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Logout User
```bash
curl -X GET http://localhost:5000/api/auth/logout \
  -H "Cookie: token=your-jwt-token"
```

## Security Features

- **Password Hashing**: Uses bcryptjs for secure password storage
- **JWT Tokens**: Secure authentication tokens
- **HTTP-only Cookies**: Prevents XSS attacks
- **CORS Protection**: Configurable cross-origin requests
- **Input Validation**: Server-side validation
- **Error Handling**: Secure error messages

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token handling
- **cookie-parser**: Cookie parsing middleware
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable loading

## Development

```bash
# Install dependencies
npm install

# Start development server with nodemon
npm run dev

# Start production server
npm start
```


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the database
- All contributors who help improve this template

## 📨 Connect with me 🦄

[![GitHub](https://img.shields.io/badge/GitHub-DeveloperChetram-black?style=flat-square&logo=github)](https://github.com/DeveloperChetram)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Chetram%20Patel-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/developerchetram/)
[![Portfolio](https://img.shields.io/badge/Portfolio-chetram--portfolio.vercel.app-blueviolet?style=flat-square)](https://chetram-portfolio.vercel.app)
[![Instagram](https://img.shields.io/badge/Instagram-@developerchetram-pink?style=flat-square&logo=instagram)](https://instagram.com/developerchetram)

*Made with ❤️ for the developer community*