import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {Client} from "../schemas/client.schema.js";

export const createClient = async (req, res,next) => {
    try {
        const {fullName,email,phone} = req.body;
        if (!fullName || !email || !phone){
            return res.status(StatusCodes.BAD_REQUEST).json({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message:"fullName,email and phone are required.",
            })
        }
        const client = new Client({fullName,email,phone});
        await client.save();
        return res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            statusMessage: getReasonPhrase(StatusCodes.CREATED),
            message:"Client created successfully.",
            data: client
        })
    }catch(err) {
        next(err)
    }
}
export const getClient = async (req, res,next) => {
    try {
        const id = req.params.id
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: "id path param is required."
        })
        const client = await Client.findOne({_id:id});
        if (!client) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `Client with id: ${id} was not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "Client retrieved successfully.",
            data: client
        })
    }catch (err){
        next(err)
    }
}
export const getClients = async (req, res,next) => {
    try {
        const clients = await Client.find({});
        if (!clients) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `Clients not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "Clients retrieved successfully.",
            data: clients
        })
    }catch (err){
        next(err)
    }
}
export const updateClient = async (req, res,next) => {
    try {
        const id = req.params.id
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: "id path param is required."
        })
        const {fullName,email,phone} = req.body;
        if (!fullName || !email || !phone){
            return res.status(StatusCodes.BAD_REQUEST).json({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: `fullName,email and phone are required.`,
            })
        }
        const update = await Client.findOneAndUpdate({_id:id},{$set:{fullName,email,phone}});
        if (!update) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `Client with id: ${id} was not found.`,
        })
        const client = await Client.findOne({_id:id});
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "Client updated successfully.",
            data: client
        })
    }catch (err){
        next(err)
    }
}
export const deleteClient = async (req, res,next) => {
    try {
        const id = req.params.id
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: "id path param is required."
        })
        const deleteResult = await Client.findOneAndDelete({_id:id});
        if (!deleteResult) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `Client with id: ${id} was not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "Client deleted successfully."
        })
    }catch (err){
        next(err)
    }
}