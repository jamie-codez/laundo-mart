import { Router } from 'express';
import {createUser, getUser, getUsers, updateUser, deleteUser, getUserMe} from "../controllers/users.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const usersRouter = Router();

usersRouter.post("/", authMiddleware(["admin"]), createUser);
usersRouter.get("/me", authMiddleware(["user"]), getUserMe);
usersRouter.get("/", authMiddleware(["user","admin"]), getUsers);
usersRouter.get("/:id", authMiddleware(["user","admin"]), getUser);
usersRouter.put("/:id", authMiddleware(["admin"]), updateUser);
usersRouter.delete("/:id", authMiddleware(["admin"]), deleteUser);

export default usersRouter;