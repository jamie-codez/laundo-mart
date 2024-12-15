import {Router} from 'express';
import {createService, getService, getServices, updateService, deleteService} from "../controllers/services.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const servicesRouter = Router();

servicesRouter.post("/", authMiddleware(["user", "admin"]), createService);
servicesRouter.get("/", authMiddleware(["user"]), getServices);
servicesRouter.get("/:id", authMiddleware(["user"]), getService);
servicesRouter.put("/:id", authMiddleware(["user"]), updateService);
servicesRouter.delete("/:id", authMiddleware(["admin"]), deleteService);

export default servicesRouter;