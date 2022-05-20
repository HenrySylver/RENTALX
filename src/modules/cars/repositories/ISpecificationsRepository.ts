import { Specification } from "../model/Specification";
import { IRequestDTO } from "../shared/utils/dtos/IRequestDTO";

interface ISpecificationsRepository {
  findByName(name: string): Specification;

  create({ description, name }: IRequestDTO);

  list(): Specification[];
}

export { ISpecificationsRepository };
