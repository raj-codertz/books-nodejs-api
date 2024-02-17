import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName'
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