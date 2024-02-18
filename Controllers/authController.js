import User from "../Models/userModel.js";
export const register = async (req, res ) => {
    const user = await User.create(req.body )
}

export const login = async (req, res ) => {

}

export const logout = async (req, res ) => {

}