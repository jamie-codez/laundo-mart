import {Router} from 'express';
import {createPayment, getPayment, getPayments, updatePayment, deletePayment} from "../controllers/payments.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const paymentsRouter = Router();

paymentsRouter.post("/", authMiddleware(["user", "admin"]), createPayment);
paymentsRouter.get("/", authMiddleware(["user"]), getPayments);
paymentsRouter.get("/:id", authMiddleware(["user"]), getPayment);
paymentsRouter.put("/:id", authMiddleware(["user"]), updatePayment);
paymentsRouter.delete("/:id", authMiddleware(["admin"]), deletePayment);

export default paymentsRouter;