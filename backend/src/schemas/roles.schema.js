import mongoose, {Schema} from "mongoose";

const RoleSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
}, {timestamps: true});

const Role = mongoose.model("role", RoleSchema);

export {Role, RoleSchema}