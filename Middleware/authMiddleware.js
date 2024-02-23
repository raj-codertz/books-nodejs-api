import {UnauthenticatedError} from "../Errors/customErrors.js";
import {verifyJWT} from "../Utils/tokenUtils.js";

export const authenticateUser = (req, res, next ) => {
    const { my_token } = req.cookies
    if (!my_token) {
        throw new UnauthenticatedError('authentication invalid')
    }
    try{
        const { userId, role } = verifyJWT(my_token)
        next()
    } catch (e) {
        throw new UnauthenticatedError('authentication invalid')
    }
}