import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class CreateCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    await this.categoriesRepository.create({ name, description });
  }
}
