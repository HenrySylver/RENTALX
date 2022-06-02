import { sub } from "date-fns";
import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO } from "../../shared/utils/dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
      created_at: sub(new Date(), { hours: 3 }),
    });

    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
