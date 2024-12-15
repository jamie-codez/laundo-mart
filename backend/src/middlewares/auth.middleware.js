import {getReasonPhrase, StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";
import {User} from "../schemas/users.schema.js";

export const authMiddleware = (roles) => {
    return async (req, res, next) => {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    statusCode: StatusCodes.UNAUTHORIZED,
                    statusMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                    message: "Authorization header is required."
                })
            }
            const token = authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({email: decodedToken.email});
            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    statusCode: StatusCodes.UNAUTHORIZED,
                    statusMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                    message: "User not found."
                })
            }
            const roleNames = await Promise.all(
                user.roles.map((role) => {
                    return role.name
                })
            )
            const hasRole = roles.some(r => roleNames.includes(r))
            if (!hasRole) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    statusCode: StatusCodes.UNAUTHORIZED,
                    statusMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                    message: "Not enough permissions."
                })
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                message: "An unexpected error occurred. Please try again."
            })
        }
    }
}