import express from 'express';
import {getReasonPhrase, StatusCodes} from "http-status-codes"
import authRouter from "./routes/auth.router.js";
import {connectMongo} from "./utils/db.js";
import {config} from "dotenv";
import {errorHandler} from "./middlewares/error.handler.js";
import usersRouter from "./routes/users.router.js";
import rolesRouter from "./routes/roles.router.js";
import clientsRouter from "./routes/client.router.js";
import servicesRouter from "./routes/services.router.js";
import paymentsRouter from "./routes/payments.router.js";
import ticketsRouter from "./routes/tickets.router.js";
import bodyParser from "body-parser";
import cors from "cors";

config()

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200)
    res.json({statusCode: StatusCodes.OK, statusMessage: getReasonPhrase(StatusCodes.OK), message: "Server is up and running"});
})
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/roles", rolesRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/tickets", ticketsRouter);
app.use("/api/v1/clients", clientsRouter);
app.use("/api/v1/payments", paymentsRouter);
app.use("*", async (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
        message: "You seem lost."
    });
})
app.use(errorHandler)

connectMongo()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        })
    })
    .catch((err) => {
        console.error(err);
    })


