import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { ICreateSpecificationDTO } from "../../shared/utils/dtos/ICreateSpecificationDTO";

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  async execute({ name, description }: ICreateSpecificationDTO) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
