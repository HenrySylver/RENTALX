import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../../config/upload";
import { ensureAuthentication } from "../../../../../midlewares/ensureAuthentication";
import { AuthenticateAccountController } from "../controller/AuthenticateAccountController";
import { CreateUserController } from "../controller/CreateUserController";
import { UpdateUserAvatarController } from "../controller/UpdateUserAvatarController";

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
