import jwt from 'jsonwebtoken';

const generateAccessToken = (user)=>{
    return jwt.sign({id:user._id},process.env.JWT_ACCESS_TOKEN_SECRET,{expiresIn:process.env.JWT_Access_ExpiresIn})
}

const generateRefreshToken = (user)=>{
    return jwt.sign({id:user._id},process.env.JWT_REFRESH_TOKEN_SECRET,{expiresIn:process.env.JWT_Refresh_ExpiresIn})
}
export {generateAccessToken,generateRefreshToken}