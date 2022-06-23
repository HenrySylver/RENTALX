import { Router } from "express";

import { AuthenticateAccountController } from "../controller/AuthenticateAccountController";
import { CreateUserController } from "../controller/CreateUserController";

export const accountsRoutes = Router();

const createUserController = new CreateUserController();

const authenticateAccountController = new AuthenticateAccountController();

accountsRoutes.post("/create-account", createUserController.handle);

accountsRoutes.post("/auth-session", authenticateAccountController.handle);
