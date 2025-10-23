# Backend API - MVC Architecture Template

## Overview
This is a generic backend template following clean MVC (Model-View-Controller) architecture using Node.js, Express.js, and MongoDB with Mongoose. This documentation serves as a reusable guide for building consistent backend APIs.

## Table of Contents
- [Architecture Design](#architecture-design)
- [Project Structure](#project-structure)
- [Naming Conventions](#naming-conventions)
- [Import/Export Patterns](#importexport-patterns)
- [Code Writing Style](#code-writing-style)
- [Error Handling](#error-handling)
- [Security Patterns](#security-patterns)
- [Database Patterns](#database-patterns)
- [API Response Format](#api-response-format)
- [Middleware Patterns](#middleware-patterns)
- [Authentication Flow](#authentication-flow)
- [Basic Setup Example](#basic-setup-example)

## Architecture Design

### MVC Pattern Implementation

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Controllers   │    │     Routes      │    │     Models      │
│                 │    │                 │    │                 │
│ - auth.controller│◄──┤ - auth.routes   │◄──┤ - user.model   │
│ - user.controller│   │ - user.routes   │    │ - product.model│
│ - index.controller│   │ - index.routes  │    │ - order.model  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Middlewares   │    │     Services    │    │   Database      │
│                 │    │                 │    │                 │
│ - auth.middleware│    │ - email.service │    │ - MongoDB       │
│ - validation.middleware│ │ - file.service │    │ - Mongoose      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Layer Responsibilities

**Controllers**: Handle HTTP requests, validate input, call services, return responses
**Models**: Define data structure, validation rules, database operations
**Routes**: Define API endpoints and map them to controllers
**Middlewares**: Handle cross-cutting concerns (auth, sanitization, error handling)
**Services**: Business logic, external API integrations
**Database**: Data persistence layer

## Project Structure

```
backend/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── auth.controllers.js
│   │   ├── user.controller.js
│   │   └── index.controller.js
│   ├── models/               # Database schemas
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   └── order.model.js
│   ├── routes/               # API route definitions
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── index.routes.js
│   ├── middlewares/          # Cross-cutting concerns
│   │   ├── auth.middleware.js
│   │   └── validation.middleware.js
│   ├── services/             # Business logic
│   │   ├── email.service.js
│   │   └── file.service.js
│   ├── db/                   # Database connection
│   │   └── db.js
│   ├── utils/                # Utility functions
│   │   └── cookieOptions.js
│   └── app.js                # Express app configuration
├── server.js                 # Server entry point
├── package.json
└── README.md
```

## Naming Conventions

### File Naming
- **Controllers**: `[feature].controllers.js` (plural)
- **Models**: `[entity].model.js` (singular)
- **Routes**: `[feature].routes.js` (plural)
- **Middlewares**: `[purpose].middleware.js`
- **Services**: `[service].service.js`

### Function Naming
- **Controllers**: `[action]Controller` (e.g., `registerController`, `loginController`)
- **Middleware**: `[purpose]Middleware` (e.g., `authMiddleware`)
- **Services**: `[action][Entity]` (e.g., `generateResponse`, `createMemory`)

### Variable Naming
- **camelCase** for variables and functions
- **PascalCase** for constructors and classes
- **UPPER_SNAKE_CASE** for constants
- **kebab-case** for file names (when applicable)

### Database Naming
- **Collections**: Plural lowercase (e.g., `users`, `products`, `orders`)
- **Fields**: camelCase (e.g., `firstName`, `createdAt`)
- **References**: Match collection name (e.g., `user`, `productId`)

## Import/Export Patterns

> **Note**: To use ES6 modules, add `"type": "module"` to your `package.json` file.

### Import Statements
```javascript
// External packages first
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Internal modules second
import userModel from '../models/user.model.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import cookieOptions from '../utils/cookieOptions.js';
```

### Export Patterns

**Default Export (Single Function/Class)**:
```javascript
// auth.middleware.js
const authMiddleware = async (req, res, next) => {
    // middleware logic
};
export default authMiddleware;
```

**Named Export (Multiple Functions)**:
```javascript
// auth.controllers.js
const registerController = async (req, res) => { /* ... */ };
const loginController = async (req, res) => { /* ... */ };
const logoutController = async (req, res) => { /* ... */ };

export {
    registerController,
    loginController,
    logoutController
};
```

**Service Export Pattern**:
```javascript
// email.service.js
const sendEmail = async (to, subject, content) => { /* ... */ };
const sendWelcomeEmail = async (user) => { /* ... */ };
const sendPasswordResetEmail = async (email, token) => { /* ... */ };

export { sendEmail, sendWelcomeEmail, sendPasswordResetEmail };
```

## Code Writing Style

### Function Structure
```javascript
const controllerName = async (req, res) => {
    try {
        // 1. Input validation
        const { field1, field2 } = req.body;
        
        // 2. Business logic
        const result = await someService(field1, field2);
        
        // 3. Response
        res.status(200).json({
            success: true,
            message: "Operation successful",
            data: result
        });
        
    } catch (error) {
        console.error('Error in controllerName:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
```

### Async/Await Pattern
- Always use `async/await` instead of `.then()/.catch()`
- Wrap async operations in try-catch blocks
- Use `Promise.all()` for parallel operations

```javascript
// Good
const [user, chat] = await Promise.all([
    userModel.findById(userId),
    chatModel.findById(chatId)
]);

// Avoid
userModel.findById(userId).then(user => {
    chatModel.findById(chatId).then(chat => {
        // nested callbacks
    });
});
```

### Error Handling Pattern
```javascript
try {
    // Operation
} catch (error) {
    console.error('Context:', error.message);
    res.status(500).json({
        success: false,
        message: "User-friendly error message"
    });
}
```

## Error Handling

### Response Format with Success Flag
All API responses MUST include a `success` boolean flag:

```javascript
// Success Response
{
    "success": true,
    "message": "Operation completed successfully",
    "data": { /* response data */ }
}

// Error Response
{
    "success": false,
    "message": "Error description",
    "error": "Optional error details"
}
```

### HTTP Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **409**: Conflict
- **500**: Internal Server Error

### Error Handling Examples

**Controller Error Handling**:
```javascript
const registerController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        
        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }
        
        // Create user
        const user = await userModel.create({ email, password });
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { user }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
```

**Middleware Error Handling**:
```javascript
const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: token not found"
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not found"
            });
        }
        
        req.user = user;
        next();
        
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};
```

## Security Patterns

### Password Security
```javascript
// Model level
passwordHash: {
    type: String,
    required: false,
    select: false,  // Never include in queries by default
    default: null
}

// Controller level - explicit selection when needed
const user = await userModel.findOne({ email }).select('+passwordHash');
```

### Response Sanitization
```javascript
// Automatic sanitization middleware
const sanitizeUserData = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
        // passwordHash automatically excluded
    };
};
```

### CORS Configuration
```javascript
const allowedOrigins = [
    'https://yourdomain.com',
    'http://localhost:3000',
    'http://localhost:5173'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
```

## Database Patterns

### Model Definition
```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true,
        select: false  // Never include in queries by default
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Security method - remove sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.passwordHash;
    return userObject;
};

const userModel = mongoose.model('users', userSchema);
export default userModel;
```

### Database Operations
```javascript
// Create
const user = await userModel.create(userData);

// Find with security
const user = await userModel.findById(id).select('+passwordHash');

// Update
const updatedUser = await userModel.findByIdAndUpdate(
    id, 
    updateData, 
    { new: true }
);

// Delete
await userModel.findByIdAndDelete(id);
```

## API Response Format

### Standard Response Structure
```javascript
// Success Response
{
    "success": true,
    "message": "Operation completed successfully",
    "data": {
        // Response data
    }
}

// Error Response
{
    "success": false,
    "message": "Error description",
    "error": "Optional technical details"
}

// List Response
{
    "success": true,
    "message": "Data fetched successfully",
    "data": {
        "items": [...],
        "count": 10,
        "page": 1,
        "limit": 10
    }
}
```

### Controller Response Examples
```javascript
// Registration Success
res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { user: sanitizedUser }
});

// Login Success
res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user: sanitizedUser }
});

// Error Response
res.status(400).json({
    success: false,
    message: "Invalid input data"
});
```

## Middleware Patterns

### Authentication Middleware
```javascript
const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: token not found"
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not found"
            });
        }
        
        req.user = user;
        next();
        
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};
```

### Response Sanitization Middleware
```javascript
const responseSanitizer = (req, res, next) => {
    const originalJson = res.json;
    
    res.json = function(data) {
        const sanitizedData = sanitizeResponse(data);
        return originalJson.call(this, sanitizedData);
    };
    
    next();
};
```

## Authentication Flow

### Registration Flow
1. Validate input data
2. Check if user exists
3. Hash password
4. Create user in database
5. Generate JWT token
6. Set HTTP-only cookie
7. Return sanitized user data

### Login Flow
1. Validate input data
2. Find user with password hash
3. Verify password
4. Generate JWT token
5. Set HTTP-only cookie
6. Return sanitized user data

### Protected Route Flow
1. Extract token from cookies
2. Verify JWT token
3. Find user in database
4. Attach user to request object
5. Continue to controller

## Best Practices

### Code Organization
1. **Single Responsibility**: Each file/function has one clear purpose
2. **Separation of Concerns**: Controllers handle HTTP, services handle business logic
3. **DRY Principle**: Avoid code duplication
4. **Consistent Naming**: Follow established conventions

### Security Best Practices
1. **Never expose sensitive data** in API responses
2. **Use HTTP-only cookies** for token storage
3. **Validate all inputs** on the server side
4. **Hash passwords** before storing
5. **Use environment variables** for secrets

### Error Handling Best Practices
1. **Always include success flag** in responses
2. **Log errors** for debugging
3. **Return user-friendly messages**
4. **Use appropriate HTTP status codes**
5. **Handle async errors** with try-catch

### Database Best Practices
1. **Use select: false** for sensitive fields
2. **Add validation** at schema level
3. **Use timestamps** for audit trails
4. **Implement soft deletes** when needed
5. **Use indexes** for frequently queried fields

### Performance Best Practices
1. **Use Promise.all()** for parallel operations
2. **Limit query results** with pagination
3. **Use lean()** for read-only operations
4. **Implement caching** for frequently accessed data
5. **Optimize database queries**

## Example Implementation

## Basic Setup Example

### Complete Controller Example
```javascript
import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieOptions from '../utils/cookieOptions.js';

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }
        
        // Create user
        const user = await userModel.create({
            name,
            email,
            passwordHash: await bcrypt.hash(password, 10)
        });
        
        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
            expiresIn: '5d' 
        });
        
        // Set cookie
        res.cookie('token', token, cookieOptions);
        
        // Sanitize response
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { user: userResponse }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user with password hash
        const user = await userModel.findOne({ email }).select('+passwordHash');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }
        
        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
            expiresIn: '5d' 
        });
        
        // Set cookie
        res.cookie('token', token, cookieOptions);
        
        // Sanitize response
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: { user: userResponse }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const logoutController = async (req, res) => {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

export { registerController, loginController, logoutController };
```

### Basic Route Setup
```javascript
import express from 'express';
import authController from '../controllers/auth.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', authController.registerController);
authRouter.post('/login', authController.loginController);
authRouter.get('/logout', authController.logoutController);

export default authRouter;
```

### Basic App Setup
```javascript
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

export default app;
```

This template provides a clean, reusable foundation for any backend project with basic authentication functionality.
