import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../controller/CreateCategoryController";
import { ImportCategoryController } from "../controller/ImportCategoryController";
import { ListCategoriesController } from "../controller/ListCategoriesController";

export const categoriesRoutes = Router();

const upload = multer({
  dest: "../../../temp",
});

const createCategoryController = new CreateCategoryController();

const importCategoryController = new ImportCategoryController();

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);
