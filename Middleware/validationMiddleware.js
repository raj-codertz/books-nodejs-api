import { body, validationResult, param } from "express-validator";
import { BadRequestError, NotFoundError } from "../Errors/customErrors.js";
import { BOOK_GENRE } from "../Utils/constants.js";
import mongoose from "mongoose";
import Book from "../Models/bookModel.js";

const withValidationErrors = ( validateValues ) => {
//  use array if you want to return more than one middleware, it's express method
    return [
        validateValues,
        (req, res,next ) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessage = errors.array().map(error => error.msg)
                if (errorMessage[0].startsWith('no book')) {
                    throw new NotFoundError(errorMessage)
                }
                throw new BadRequestError(errorMessage)
            }
            next();
        }
    ]
}

export const validateBookInput = withValidationErrors([
    body('title').notEmpty().withMessage('title is required'),
    body('author').notEmpty().withMessage('author is required'),
    body('genre')
        .isIn(Object.values(BOOK_GENRE))
        .withMessage('Invalid genre value')
])

export const validateIdParam = withValidationErrors([
    param('id')
        .custom( async(value) => {
         const isValidId =  mongoose.Types.ObjectId.isValid(value)
         if (!isValidId) throw new Error('Invalid MongoDB Id')
         const book = await Book.findById(value)
            if (!book) throw new Error(`no book with id: ${value}`)
        })
])