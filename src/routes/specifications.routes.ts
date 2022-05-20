import { Router } from "express";
import multer from "multer";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification/index";
import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";

const specificationsRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", (request, response) => {
  return listSpecificationsController.handle(request, response);
});

specificationsRoutes.post(
  "/import",
  upload.single("file"),
  (request, response) => {
    return response.send();
  }
);

export { specificationsRoutes };
