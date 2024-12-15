import mongoose from "mongoose";
import {config} from "dotenv";

config()

const databaseUrl = process.env.MONGODB_URI;

if (!databaseUrl) throw new Error("MongoDB URL must be provided");

const connectionOptions = {
    user              : process.env.MONGODB_USER,
    pass              : process.env.MONGODB_PASSWORD,
    waitQueueTimeoutMS: 10000,
    connectTimeoutMS  : 10000,
    maxIdleTimeMS     : 10000,
    retryWrites       : true,
    authSource        : "admin",
    dbName            : process.env.MONGODB_NAME,
}

export const connectMongo = async () => {
    await mongoose.connect(databaseUrl, connectionOptions);
    const connection = mongoose.connection
    connection.once("open", () => {
        console.log("Connected to MongoDB");
    })
    connection.on("error", (err) => {
        console.error(err);
    })
    connection.on("disconnected", () => {
        console.warn("Disconnected from MongoDB");
    })
    connection.on("close", () => {
        console.log("Connection closed");
    })
    process.on("SIGINT", () => {
        mongoose.connection.close();
    })
}