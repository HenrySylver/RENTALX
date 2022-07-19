import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;

  create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification>;

  list(): Promise<Specification[]>;
}
