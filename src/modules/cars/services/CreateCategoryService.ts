import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/http/routes/typeorm/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface ICategory {
  category: Category;
  err: boolean;
}
@injectable()
export class CreateCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<ICategory> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    let category: ICategory;

    if (categoryAlreadyExists) {
      category = {
        category: categoryAlreadyExists,
        err: true,
      };
    } else {
      const repositoryResponse = await this.categoriesRepository.create({
        name,
        description,
      });

      category = {
        category: repositoryResponse,
        err: false,
      };
    }

    return category;
  }
}
