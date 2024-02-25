import User from "../Models/userModel.js";
import {StatusCodes} from "http-status-codes";
import {hashPassword, comparePassword } from "../Utils/passwordUtils.js";
import {UnauthenticatedError} from "../Errors/customErrors.js";
import {createJWT} from "../Utils/tokenUtils.js";
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
    const isValid = user && ( await comparePassword(req.body.password, user.password ))
    if (!isValid) throw new UnauthenticatedError('Invalid credentials')

    const token = createJWT({ userId: user._id, role: user.role })

    // creating cookie and send together with token
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('my_token', token, {
        httpOnly: true,
        expires: new Date( Date.now() + oneDay ),
        secure: process.env.NODE_ENV === 'production'
    })
    res.status(StatusCodes.OK).json({ msg: 'user login'})

}

export const logout = async (req, res ) => {

}