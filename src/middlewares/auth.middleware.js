import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

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

export default authMiddleware;
