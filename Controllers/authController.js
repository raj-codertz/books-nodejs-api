import User from "../Models/userModel.js";
import {StatusCodes} from "http-status-codes";
import {hashPassword, comparePassword } from "../Utils/passwordUtils.js";
import {UnauthenticatedError} from "../Errors/customErrors.js";
export const register = async (req, res ) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'author'

    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword

    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ user })
}

export const login = async (req, res ) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new UnauthenticatedError('Invalid credentials')

    const isPasswordCorrect = await comparePassword(
        req.body.password,
        user.password
    )
    if ( !isPasswordCorrect ) throw new UnauthenticatedError('Invalid credentials')

    res.send('login route')

}

export const logout = async (req, res ) => {

}