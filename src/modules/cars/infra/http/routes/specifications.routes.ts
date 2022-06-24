import { Router } from "express";
import multer from "multer";

import { ensureAuthentication } from "../../../../../midlewares/ensureAuthentication";
import { CreateSpecificationController } from "../controller/CreateSpecificationController";
import { ImportSpecificationController } from "../controller/ImportSpecificationsController";
import { ListSpecificationsController } from "../controller/ListSpecificationsController";

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
