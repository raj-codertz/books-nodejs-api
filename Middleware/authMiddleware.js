import {UnauthenticatedError} from "../Errors/customErrors.js";
export const authenticateUser = (req, res, next ) => {
    const { my_token } = req.cookies
    if (!my_token) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    next()
}