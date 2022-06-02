import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO } from "../shared/utils/dtos/ICreateSpecificationDTO";

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;

  create({ description, name }: ICreateSpecificationDTO): Promise<void>;

  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository };
