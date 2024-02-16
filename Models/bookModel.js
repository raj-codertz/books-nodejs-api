import mongoose from "mongoose";
import { BOOK_GENRE } from "../Utils/constants.js";

const bookSchema =new mongoose.Schema(
    {
        title:String,
        author: String,
        genre:{
            type: String,
            enum: Object.values(BOOK_GENRE),
            default: BOOK_GENRE.FINANCE
        }
    },
    { timestamps: true }
)

export default mongoose.model('Book', bookSchema )