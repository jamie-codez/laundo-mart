import mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
},{timestamps: true});

export const Client = mongoose.model('client', ClientSchema);