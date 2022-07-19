import { CreateSpecificationController } from "@modules/cars/infra/http/controller/CreateSpecificationController";
import { ImportSpecificationController } from "@modules/cars/infra/http/controller/ImportSpecificationsController";
import { ListSpecificationsController } from "@modules/cars/infra/http/controller/ListSpecificationsController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

export const specificationsRoutes = Router();

const upload = multer({
  dest: "../../../temp",
});

const createSpecificationController = new CreateSpecificationController();

const importSpecificationController = new ImportSpecificationController();

const listSpecificationController = new ListSpecificationsController();

specificationsRoutes.use(ensureAuthentication);

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationController.handle);

specificationsRoutes.post(
  "/import",
  upload.single("file"),
  importSpecificationController.handle
);
