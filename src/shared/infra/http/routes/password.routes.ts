import { Router } from "express";

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailProvider();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)