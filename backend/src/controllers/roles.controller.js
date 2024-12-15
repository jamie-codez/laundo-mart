import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {Role} from "../schemas/roles.schema.js";

export const createRole = async (req, res) => {
    const {name, description} = req.body;
    if (!name || !description) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: "name and description are required."
        })
    }
    const exist = await Role.findOne({name});
    if (exist) return res.status(StatusCodes.CONFLICT).json({
        statusCode: StatusCodes.CONFLICT,
        statusMessage: getReasonPhrase(StatusCodes.CONFLICT),
        message: `Role with name :${name} already exists.`
    })
    const role = new Role({name, description});
    await role.save()
    return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        statusMessage: getReasonPhrase(StatusCodes.CREATED),
        message: `Role created successfully.`,
        data: role
    })
}
export const getRole = async (req, res) => {
    const id = req.params.id
    if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: StatusCodes.BAD_REQUEST,
        statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
        message: `id is required.`,
    })
    const role = await Role.findOne({_id: id});
    if (!role) return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
        message: `Role with id: ${id} was not found.`,
    })
    return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        statusMessage: getReasonPhrase(StatusCodes.OK),
        message: `Role with id: ${id} was found.`,
        data: role
    })
}
export const getRoles = async (req, res) => {
    const roles = await Role.find({});
    if (!roles) return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
        message: `Roles not found.`,
    })
    return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        statusMessage: getReasonPhrase(StatusCodes.OK),
        message: "Role retrieved successfully.",
        data: roles
    })
}
export const updateRole = async (req, res) => {
    const id = req.params.id
    const {name, description} = req.body;
    if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: StatusCodes.BAD_REQUEST,
        statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
        message: `id is required.`,
    })
    if (!name || !description) return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: StatusCodes.BAD_REQUEST,
        statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
        message: `name and description required.`,
    })
    const role = await Role.findOneAndDelete({_id: id}, {name, description});
    if (!role) return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
        message: `Role with id: ${id} was not found.`,
    })
    return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        statusMessage: getReasonPhrase(StatusCodes.OK),
        message: `Role with id: ${id} was updated.`,
        data: role
    })
}
export const deleteRole = async (req, res) => {
    const id = req.params.id
    if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: StatusCodes.BAD_REQUEST,
        statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
        message: `id is required.`,
    })
    const role = await Role.findOneAndDelete({_id: id});
    if (!role) return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
        message: `Role with id: ${id} was not found.`,
    })
    return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        statusMessage: getReasonPhrase(StatusCodes.OK),
        message: `Role with id: ${id} was delete successfully.`,
        data: role
    })
}

(function (){
    const defaultRoles = ["user","admin","manager"];
    defaultRoles.forEach(async (name)=>{
        const role = await Role.findOne({name});
        if (!role){
            const newRole = new Role({name,description:`Default ${name} role.`})
        }
    })
    console.log("Default roles created successfully.")
})()