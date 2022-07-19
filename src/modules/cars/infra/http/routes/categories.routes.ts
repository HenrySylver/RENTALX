import { CreateCategoryController } from "@modules/cars/infra/http/controller/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/infra/http/controller/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/infra/http/controller/ListCategoriesController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

export const categoriesRoutes = Router();

const upload = multer({
  dest: "../../../temp",
});

const createCategoryController = new CreateCategoryController();

const importCategoryController = new ImportCategoryController();

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.use(ensureAuthentication);

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);
