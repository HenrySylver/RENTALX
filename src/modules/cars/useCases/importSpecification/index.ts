import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ImportSpecificationsController } from "./ImportSpecificationsController";
import { ImportSpecificationsUseCase } from "./ImportSpecificationsUseCase";

export default (): ImportSpecificationsController => {
  const categoriesRepository = new SpecificationsRepository();

  const importSpecificationUseCase = new ImportSpecificationsUseCase(
    categoriesRepository
  );

  const importSpecificationController = new ImportSpecificationsController(
    importSpecificationUseCase
  );

  return importSpecificationController;
};
