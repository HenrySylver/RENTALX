import { Router } from "express";
<<<<<<< HEAD
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

=======

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository
  );

  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

specificationsRoutes.get("/", (request, response) => {
  const all = specificationsRepository.list();

  return response.json(all);
});

>>>>>>> ef618148756b11d2d051c9b16549bd4fb8a01cf0
export { specificationsRoutes };
