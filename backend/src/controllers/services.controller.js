import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {Service} from "../schemas/services.schema.js";

export const createService = async (req, res, next) => {
    try {
        const {name, description} = req.body;
        if (!name || !description) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: "name and description are required",
            })
        }
        const service = await Service.findOne({name});
        if (service) {
            return res.status(StatusCodes.CONFLICT).json({
                statusCode: StatusCodes.CONFLICT,
                statusMessage: getReasonPhrase(StatusCodes.CONFLICT),
                message: `Service with name: ${name} already exists.`,
            })
        }
        const newService = new Service({name,description})
        await newService.save();
        if (!ticket) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            message: `Error occurred creating service.`,
        })
        return res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            statusMessage: getReasonPhrase(StatusCodes.CREATED),
            message: "Service created successfully.",
            data: newService._doc
        })
    } catch (err) {
        next(err)
    }
}
export const getService = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: "id path param is required."
        })
        const service = await Service.findOne({_id: id});
        if (!ticket) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `Service with id: ${id} was not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "Client retrieved successfully.",
            data: service
        })
    } catch (err) {
        next(err)
    }
}
export const getServices = async (req, res, next) => {
    try {
        const services = await Service.find({});
        if (!deleteResult) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: "No services found.",
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "Services retrieved successfully.",
            data: tickets
        })
    } catch (err) {
        next(err)
    }
}
export const updateService = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: "id is required",
            })
        }
        const {name, description} = req.body;
        if (!name|| !description) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: "name and description are required",
            })
        }
        const service = await Service.findOne({_id: id});
        if (!service) {
            return res.status(StatusCodes.NOT_FOUND).json({
                statusCode: StatusCodes.NOT_FOUND,
                statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
                message: `Service with id ${id} not found.`,
            })
        }
        const update = await Service.findOneAndUpdate({_id:id},{$set:{name,description}})
        if (!update) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            message: `Error occurred creating ticket.`,
        })
        const svc = await Service.findOne({_id:id});
        return res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            statusMessage: getReasonPhrase(StatusCodes.CREATED),
            message: "Ticket updated successfully.",
            data: svc
        })
    } catch (err) {
        next(err)
    }
}
export const deleteService = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: "id path param is required."
        })
        const deleteResult = await Service.findOneAndDelete({_id: id});
        if (!deleteResult) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `Service with id: ${id} was not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "Service deleted successfully."
        })
    } catch (err) {
        next(err)
    }
}