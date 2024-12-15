import mongoose, {Schema} from "mongoose";
import {PaymentSchema} from "./payment.schema.js";
import {ClientSchema} from "./client.schema.js";
import {ServiceSchema} from "./services.schema.js";

export const TicketSchema = new Schema({
    title: {type: String, required: true},
    client: {type: String, required: true},
    description: {type: String, required: true},
    service: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, required: true},
    payment: {type:PaymentSchema,required:false},
}, {timestamps: true});

export const Ticket = mongoose.model("ticket", TicketSchema);