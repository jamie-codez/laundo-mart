import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {User} from "../schemas/users.schema.js";
import {Role} from "../schemas/roles.schema.js";
import {hash} from "bcrypt";

export const createUser = async (req, res) => {
    const {fullName, email, roles, password} = req.body;
    if (!fullName || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: "fullName, email, password are required."
        })
    }
    const userExist = await User.findOne({email});
    if (userExist) return res.status(StatusCodes.CONFLICT).send({
        statusCode: StatusCodes.CONFLICT,
        statusMessage: getReasonPhrase(StatusCodes.CONFLICT),
        message: `User with email: ${email} already exists.`
    })
    let rolesList = []
    if (roles) {
        rolesList = await Promise.all(
            roles.map(async (name) => {
                const rl = await Role.findOne({name});
                if (!rl) return res.status(StatusCodes.NOT_FOUND).send({
                    statusCode: StatusCodes.NOT_FOUND,
                    statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
                    message: `Role with name: ${name} not found.`
                })
                return rl
            })
        )
    }
    if (rolesList.length === 0) rolesList.push(await Role.findOne({name: "user"}));
    const passwordHash = await hash(password, 10);
    const user = new User({fullName, email, roles: rolesList, password: passwordHash});
    await user.save();
    const doc = user._doc
    return res.status(StatusCodes.CREATED).send({
        statusCode: StatusCodes.CREATED,
        statusMessage: getReasonPhrase(StatusCodes.CREATED),
        message: "User created successfully.",
        data: doc
    })
}

export const getUserMe = async (req, res,next) => {
    try {
        const {email} = req.user
        console.log(email)
        if (!email) return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: `email is required.`,
        })
        const user = await User.findOne({email});
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `User with email: ${email} was not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: `User with email: ${email} retrieved successfully.`,
            data: user
        })
    }catch (e) {
        next(e);
    }
}

export const getUser = async (req, res,next) => {
    try {
        const id = req.params.id
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: `id is required.`,
        })
        const user = await User.findOne({_id: id});
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `User with id: ${id} was not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: `User with id: ${id} retrieved successfully.`,
            data: role
        })
    }catch (e) {
        next(e);
    }
}
export const getUsers = async (req, res,next) => {
    try {
        const users = await User.find({});
        if (!users) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `Users not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: `Users retrieved successfully.`,
            data: users
        })
    }catch (e) {
        next(e);
    }
}
export const updateUser = async (req, res,next) => {
    try {
        const id = req.params.id
        if (!id) return res.status(StatusCodes.BAD_REQUEST).send({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: `id is required.`,
        })
        const {fullName, email, roles, password} = req.body;
        if (!fullName || !email) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: "fullName, email, password are required."
            })
        }
        const userExist = await User.findOne({email});
        if (!userExist) return res.status(StatusCodes.NOT_FOUND).send({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `User with email: ${email} does not exists.`
        })
        let rolesList = []
        if (roles) {
            rolesList = await Promise.all(
                roles.map(async (name) => {
                    const rl = await Role.findOne({name});
                    if (!rl) return res.status(StatusCodes.NOT_FOUND).send({
                        statusCode: StatusCodes.NOT_FOUND,
                        statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
                        message: `Role with name: ${name} not found.`
                    })
                    return rl
                })
            )
        }
        if (rolesList.length === 0) rolesList.push(await Role.findOne({name: "user"}));
        const update = {}
        if (password) {
            update.password = await hash(password, 10)
        }
        const user = await User.findOneAndUpdate({_id: id}, {...update, fullName, email, roles})
        const doc = await User.findOne({_id: id});
        return res.status(StatusCodes.CREATED).send({
            statusCode: StatusCodes.CREATED,
            statusMessage: getReasonPhrase(StatusCodes.CREATED),
            message: "User created successfully.",
            data: doc
        })
    }catch (e) {
        next(e);
    }
}
export const deleteUser = async (req, res,next) => {
    try {
        const id = req.params.id
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: `id is required.`,
        })
        const role = await User.findOneAndDelete({_id: id});
        if (!role) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `User with id: ${id} was not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: `User with id: ${id} was delete successfully.`,
            data: role
        })
    }catch (e) {
        next(e)
    }
}