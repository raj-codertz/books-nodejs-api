import mongoose from "mongoose";
import { BOOK_GENRE } from "../Utils/constants.js";

// This is Book model
const bookSchema =new mongoose.Schema(
    {
        title:String,
        author: String,
        genre:{
            type: String,
            enum: Object.values(BOOK_GENRE),
            default: BOOK_GENRE.FINANCE
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'author'
        }
    },
    { timestamps: true }
)

export default mongoose.model('Book', bookSchema )