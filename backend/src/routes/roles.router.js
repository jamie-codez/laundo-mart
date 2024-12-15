import { Router } from 'express';
import {createRole,getRole,getRoles,updateRole,deleteRole} from "../controllers/roles.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const rolesRouter = Router();

rolesRouter.post("/", authMiddleware(["user","admin"]), createRole);
rolesRouter.get("/", authMiddleware(["user","admin"]), getRoles);
rolesRouter.get("/:id", authMiddleware(["user","admin"]), getRole);
rolesRouter.put("/:id", authMiddleware(["user","admin"]), updateRole);
rolesRouter.delete("/:id", authMiddleware(["admin"]), deleteRole);

export default rolesRouter;