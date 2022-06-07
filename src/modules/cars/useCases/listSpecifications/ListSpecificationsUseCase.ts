import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Category[]> {
    const Specifications = await this.specificationsRepository.list();

    return Specifications;
  }
}

export { ListSpecificationsUseCase };
