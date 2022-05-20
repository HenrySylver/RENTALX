import { Category } from "../../model/Category";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor(private SpecificationsRepository: ISpecificationsRepository) {}

  execute(): Category[] {
    const Specifications = this.SpecificationsRepository.list();

    return Specifications;
  }
}

export { ListSpecificationsUseCase };
