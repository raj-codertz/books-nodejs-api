import User from "../Models/userModel.js";
import {StatusCodes} from "http-status-codes";
export const register = async (req, res ) => {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ user })
}

export const login = async (req, res ) => {

}

export const logout = async (req, res ) => {

}