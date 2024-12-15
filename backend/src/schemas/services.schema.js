import mongoose, {Schema} from "mongoose";

export const ServiceSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
}, {timestamps: true});

export const Service = mongoose.model("services", ServiceSchema);
