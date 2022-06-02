import { Category } from "../entities/Category";
import { ICreateCategoryDTO } from "../shared/utils/dtos/ICreateCategoryDTO";

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;

  create({ name, description }: ICreateCategoryDTO): Promise<void>;

  list(): Promise<Category[]>;
}

export { ICategoriesRepository };
