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
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        
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
