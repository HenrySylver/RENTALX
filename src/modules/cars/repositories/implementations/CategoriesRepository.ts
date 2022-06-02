import { sub } from "date-fns";
import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import { ICreateCategoryDTO } from "../../shared/utils/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
      created_at: sub(new Date(), { hours: 3 }),
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
