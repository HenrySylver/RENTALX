import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListSpecificationsService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Category[]> {
    const Specifications = await this.specificationsRepository.list();

    return Specifications;
  }
}
