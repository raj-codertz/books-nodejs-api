import { body, validationResult } from "express-validator";
import { BadRequestError } from "../Errors/customErrors.js";

const withValidationErrors = ( validateValues ) => {
//  use array if you want to return more than one middleware, it's express method
    return [
        validateValues,
        (req, res,next ) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessage = errors.array().map(error => error.msg)
                return res.status(400).json({ msg: errorMessage})
            }
            next();
        }
    ]
}

export const validateTest = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('name is required')
        .isLength({ min: 3, max: 50 })
        .withMessage('name must be between 3 and 50 characters long')
        .trim()
])