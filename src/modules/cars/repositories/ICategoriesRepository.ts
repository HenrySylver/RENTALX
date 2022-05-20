import { Category } from "../model/Category";
import { IRequestDTO } from "../shared/utils/dtos/IRequestDTO";

interface ICategoriesRepository {
  findByName(name: string): Category;

  create({ name, description }: IRequestDTO);

  list(): Category[];
}

export { ICategoriesRepository };
