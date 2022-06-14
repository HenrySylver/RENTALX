import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;

  create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification>;

  list(): Promise<Specification[]>;
}
