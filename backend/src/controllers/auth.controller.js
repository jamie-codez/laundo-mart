import {User} from "../schemas/users.schema.js";
import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {compare, hash} from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: "email and password are required."
            });
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                statusCode: StatusCodes.NOT_FOUND,
                statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
                message: `No user with email: ${email} was found.`
            });
        }
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: "Invalid credentials."
            })
        }
        const payload = {fullName: user.fullName, email: user.email, roles: user.roles}
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {algorithm: "HS256", expiresIn: "7d"});
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "User logged in successfully.",
            data:{token: jwtToken}
        });
    } catch (error) {
        next(error);
    }
}