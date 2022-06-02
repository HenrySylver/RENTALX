import { Category } from "../../entities/Category";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  async execute(): Promise<Category[]> {
    const Specifications = await this.specificationsRepository.list();

    return Specifications;
  }
}

export { ListSpecificationsUseCase };
