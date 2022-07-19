import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;

  create({ name, description }: ICreateCategoryDTO): Promise<Category>;

  list(): Promise<Category[]>;
}
