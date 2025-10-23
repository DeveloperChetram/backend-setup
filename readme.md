# Backend MVC Template

[![npm version](https://badge.fury.io/js/backend-mvc-template.svg)](https://badge.fury.io/js/backend-mvc-template)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A complete backend API template following MVC architecture with Node.js, Express.js, MongoDB, and JWT authentication. Perfect for rapid backend development and learning MVC patterns.

## 🚀 Quick Start

### Installation & Usage

```bash
# Create a new backend project with npx (no installation needed!)
npx create-mvc-backend-app my-awesome-backend
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

### Setup

1. **Copy environment variables:**
   ```bash
   cp env.example .env
   ```

2. **Update `.env` file with your configuration:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

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

## Project Structure

```
backend/
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
├── package.json
├── env.example               # Environment variables template
└── README.md
```

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

## 📦 Publishing to NPM

### Prerequisites

1. **Create npm account**: Sign up at [npmjs.com](https://www.npmjs.com/)
2. **Login to npm**: `npm login`
3. **Update package.json**: Replace placeholder values with your actual information

### Publishing Steps

1. **Update package information in package.json:**
   ```json
   {
     "name": "your-unique-package-name",
     "author": "Your Name <your.email@example.com>",
     "repository": {
       "type": "git",
       "url": "https://github.com/yourusername/your-repo.git"
     },
     "bugs": {
       "url": "https://github.com/yourusername/your-repo/issues"
     },
     "homepage": "https://github.com/yourusername/your-repo#readme"
   }
   ```

2. **Test your package:**
   ```bash
   npm pack
   ```

3. **Publish to npm:**
   ```bash
   npm publish
   ```

4. **Update version for future releases:**
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   npm publish
   ```

### Package Information

- **Package Name**: `backend-mvc-template` (change to your unique name)
- **Version**: `1.0.0`
- **License**: MIT
- **Node Version**: >=14.0.0
- **Main File**: `server.js`

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

---

**Made with ❤️ for the developer community**