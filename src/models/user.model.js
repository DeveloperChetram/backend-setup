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
