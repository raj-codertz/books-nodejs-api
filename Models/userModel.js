import mongoose from "mongoose";

// This is User model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'Shabani'
    },
    location: {
        type: String,
        default: 'Dar es salaam'
    },
    role: {
        type: String,
        enum: ['author', 'admin'],
        default: 'author'
    }
})
export default mongoose.model('User', userSchema)