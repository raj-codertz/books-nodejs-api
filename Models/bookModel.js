import mongoose from "mongoose";

const bookSchema =new mongoose.Schema(
    {
        title:String,
        author: String,
        genre:{
            type: String,
            enum: ['finance', 'romance', 'economics', 'others'],
            default: 'finance'
        }
    },
    { timestamps: true }
)

export default mongoose.model('Book', bookSchema )