# Backend MVC Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A complete backend API template following MVC architecture with Node.js, Express.js, MongoDB, and JWT authentication. Perfect for rapid backend development and learning MVC patterns.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14.0.0 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation & Setup

1. **Clone or download this repository:**
   ```bash
   git clone <repository-url>
   cd backend-setup
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```

4. **Configure your `.env` file:**
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/backend-template
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

5. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000` (or your configured PORT).

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
backend-setup/
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
| `COOKIE_EXPIRES_IN` | Cookie expiration time | 5d |

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

# Start development server with nodemon (auto-restart on changes)
npm run dev

# Start production server
npm start
```

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (currently not implemented)

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
## 📨 Connect with me 🦄

[![GitHub](https://img.shields.io/badge/GitHub-DeveloperChetram-black?style=flat-square&logo=github)](https://github.com/DeveloperChetram)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Chetram%20Patel-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/developerchetram/)
[![Visit Portfolio](https://img.shields.io/badge/Portfolio-chetram--portfolio.vercel.app-blueviolet?style=flat-square)](https://chetram-portfolio.vercel.app)

**Made with ❤️ for the developer community**