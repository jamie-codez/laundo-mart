import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {Client} from "../schemas/client.schema.js";
import {Ticket} from "../schemas/tickets.schema.js";
import {Service} from "../schemas/services.schema.js";
import {ObjectId} from "mongoose"

export const createTicket = async (req, res, next) => {
    try {
        const requestBody = req.body;
        if (!requestBody) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: "Request body is required."
            })
        }
        const ticket = new Ticket({...requestBody})
        await ticket.save();
        if (!ticket) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            message: `Error occurred creating ticket.`,
        })
        return res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            statusMessage: getReasonPhrase(StatusCodes.CREATED),
            message: "Ticket created successfully.",
            data: ticket._doc
        })
    } catch (err) {
        next(err)
    }
}
export const getTicket = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: "id path param is required."
        })
        const ticket = await Ticket.findOne({_id: id});
        if (!ticket) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `Ticket with id: ${id} was not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "Client retrieved successfully.",
            data: ticket
        })
    } catch (err) {
        next(err)
    }
}
export const getTickets = async (req, res, next) => {
    try {
        const tickets = await Ticket.find({});
        if (!tickets) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: "No tickets found.",
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "Tickets retrieved successfully.",
            data: tickets
        })
    } catch (err) {
        next(err)
    }
}
export const updateTicket = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: "id is required",
            })
        }
        const requestBody = req.body;
        if (!requestBody) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                statusCode: StatusCodes.BAD_REQUEST,
                statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: "Request body is required."
            })
        }
        const ticket = await Ticket.findOne({_id: id});
        if (!ticket) {
            return res.status(StatusCodes.NOT_FOUND).json({
                statusCode: StatusCodes.NOT_FOUND,
                statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
                message: `Ticket with id ${clientId} not found.`,
            })
        }
        const ticketUpdate = await Ticket.findOneAndUpdate({_id:id},{$set:{...requestBody}})
        if (!ticketUpdate) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            message: `Error occurred creating ticket.`,
        })
        const updatedTicket = await Ticket.findOne({_id:id})
        return res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            statusMessage: getReasonPhrase(StatusCodes.CREATED),
            message: "Ticket updated successfully.",
            data: updatedTicket
        })
    } catch (err) {
        next(err)
    }
}
export const deleteTicket = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: "id path param is required."
        })
        const deleteResult = await Ticket.findOneAndDelete({_id:id})
        if (!deleteResult) return res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
            message: `Ticket with id: ${id} was not found.`,
        })
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            statusMessage: getReasonPhrase(StatusCodes.OK),
            message: "Ticket deleted successfully."
        })
    } catch (err) {
        next(err)
    }
}