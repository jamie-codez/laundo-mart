import {Router} from 'express';
import {createTicket, getTicket, getTickets, updateTicket, deleteTicket} from "../controllers/tickets.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const ticketsRouter = Router();

ticketsRouter.post("/", authMiddleware(["user", "admin"]), createTicket);
ticketsRouter.get("/", authMiddleware(["user"]), getTickets);
ticketsRouter.get("/:id", authMiddleware(["user"]), getTicket);
ticketsRouter.put("/:id", authMiddleware(["user"]), updateTicket);
ticketsRouter.delete("/:id", authMiddleware(["admin"]), deleteTicket);

export default ticketsRouter;