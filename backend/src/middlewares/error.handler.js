import {StatusCodes, getReasonPhrase} from "http-status-codes";

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err.stack);
    res.status(statusCode).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        message,
    });
};