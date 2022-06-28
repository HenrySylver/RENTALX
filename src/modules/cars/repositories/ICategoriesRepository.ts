import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/http/routes/typeorm/entities/Category";

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;

  create({ name, description }: ICreateCategoryDTO): Promise<Category>;

  list(): Promise<Category[]>;
}
