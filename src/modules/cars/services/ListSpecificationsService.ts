import { inject, injectable } from "tsyringe";

import { Category } from "../infra/http/routes/typeorm/entities/Category";
import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

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
