import mongoose, {Schema} from "mongoose";
import {RoleSchema} from "./roles.schema.js";

export const UserSchema = new Schema({
    fullName: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    roles: {type:[RoleSchema],required:true},
    password: {type: String, required: true},
}, {timestamps: true});

export const User = mongoose.model("user", UserSchema);