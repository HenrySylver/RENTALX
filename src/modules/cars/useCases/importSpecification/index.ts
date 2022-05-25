import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { ImportSpecificationsController } from "./ImportSpecificationsController";
import { ImportSpecificationsUseCase } from "./ImportSpecificationsUseCase";

const categoriesRepository = SpecificationsRepository.getInstance();

const importSpecificationUseCase = new ImportSpecificationsUseCase(
  categoriesRepository
);

const importSpecificationController = new ImportSpecificationsController(
  importSpecificationUseCase
);

export { importSpecificationController };
