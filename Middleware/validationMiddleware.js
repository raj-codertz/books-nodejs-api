import { body, param,validationResult} from "express-validator";
import {BadRequestError, NotFoundError, UnauthorizedError} from "../Errors/customErrors.js";
import { BOOK_GENRE } from "../Utils/constants.js";
import mongoose from "mongoose";
import Book from "../Models/bookModel.js";
import User from "../Models/userModel.js"

const withValidationErrors = ( validateValues ) => {
//  use array if you want to return more than one middleware, it's express method
    return [
        validateValues,
        (req, res, next ) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessage = errors.array().map(error => error.msg)
                if (errorMessage[0].startsWith('no book')) {
                   throw new NotFoundError(errorMessage)
                }
                if (errorMessage[0].startsWith('not authorized')) {
                    throw new UnauthorizedError(errorMessage)
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
        .custom( async(value, {req}) => {
         const isValidId =  mongoose.Types.ObjectId.isValid(value)
         if (!isValidId) throw new Error('Invalid MongoDB Id')
         const book = await Book.findById(value)
            if (!book) throw new Error(`no book with id: ${value}`)
            const isAdmin = req.user.role === 'admin'
            const isOwnwer = req.user.userId === book.createdBy.toString()
            if (!isAdmin && !isOwnwer) throw new Error('not authorized to access this route')
        })
])

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom( async (email) => {
            const user = await User.findOne({ email })
            if ( user ) {
                throw new Error('email is already exist')
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength( { min: 8 })
        .withMessage('password must be at least 8 characters long'),
    body('lastName')
        .notEmpty()
        .withMessage('lastname is required'),
    body('location')
        .notEmpty()
        .withMessage('location is required')
])

export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('password is required')
])