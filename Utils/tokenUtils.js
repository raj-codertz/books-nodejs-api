import jwt from 'jsonwebtoken'

export const createJWT = (payload) => {
    const token = jwt.sign(payload, 'secret123', {
        expiresIn: '1d'
    })
    return token
}