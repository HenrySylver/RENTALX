import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ImportSpecificationsController } from "./ImportSpecificationsController";
import { ImportSpecificationsUseCase } from "./ImportSpecificationsUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const importSpecificationUseCase = new ImportSpecificationsUseCase(
  categoriesRepository
);

const importSpecificationController = new ImportSpecificationsController(
  importSpecificationUseCase
);

export { importSpecificationController };
