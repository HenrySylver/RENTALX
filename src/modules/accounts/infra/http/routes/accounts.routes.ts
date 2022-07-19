import uploadConfig from "@config/upload";
import { AuthenticateAccountController } from "@modules/accounts/infra/http/controller/AuthenticateAccountController";
import { CreateUserController } from "@modules/accounts/infra/http/controller/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/infra/http/controller/UpdateUserAvatarController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

export const accountsRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();

const authenticateAccountController = new AuthenticateAccountController();

const updateUserAvatarController = new UpdateUserAvatarController();

accountsRoutes.post("/create-account", createUserController.handle);

accountsRoutes.post("/auth-session", authenticateAccountController.handle);

accountsRoutes.patch(
  "/update-avatar",
  ensureAuthentication,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
