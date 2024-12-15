import {Router} from 'express';
import {createClient, getClient, getClients, updateClient, deleteClient} from "../controllers/client.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const clientsRouter = Router();

clientsRouter.post("/", authMiddleware(["user", "admin"]), createClient);
clientsRouter.get("/", authMiddleware(["user"]), getClients);
clientsRouter.get("/:id", authMiddleware(["user"]), getClient);
clientsRouter.put("/:id", authMiddleware(["user"]), updateClient);
clientsRouter.delete("/:id", authMiddleware(["admin"]), deleteClient);

export default clientsRouter;