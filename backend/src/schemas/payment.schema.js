import mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
    amount: {type: Number, required: true},
    phoneNumber: {type: Number, required: true},
    status: {type: String, required: true},
},{ timestamps: true });

export const Payment = mongoose.model('payment', PaymentSchema);