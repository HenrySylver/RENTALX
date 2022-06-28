import { inject, injectable } from "tsyringe";

import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/http/routes/typeorm/entities/Specification";
import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface ISpecification {
  specification: Specification;
  err: boolean;
}
@injectable()
export class CreateSpecificationService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<ISpecification> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    let specification: ISpecification;

    if (specificationAlreadyExists) {
      specification = {
        specification: specificationAlreadyExists,
        err: true,
      };
    } else {
      const repositoryResponse = await this.specificationsRepository.create({
        name,
        description,
      });

      specification = {
        specification: repositoryResponse,
        err: false,
      };
    }

    return specification;
  }
}
