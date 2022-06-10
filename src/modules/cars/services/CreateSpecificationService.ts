import { inject, injectable } from "tsyringe";

import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

@injectable()
export class CreateSpecificationService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    await this.specificationsRepository.create({ name, description });
  }
}
