import { Router } from "express";
import multer from "multer";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ImportSpecificationController } from "../modules/cars/useCases/importSpecification/ImportSpecificationsController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createSpecificationController = new CreateSpecificationController();

const importSpecificationController = new ImportSpecificationController();

const listSpecificationController = new ListSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationController.handle);

specificationsRoutes.post(
  "/import",
  upload.single("file"),
  importSpecificationController.handle
);

export { specificationsRoutes };
