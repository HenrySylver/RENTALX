import { CreateSpecificationService } from "@modules/cars/services/CreateSpecificationService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createSpecificationService = container.resolve(
      CreateSpecificationService
    );

    const { name, description } = request.body;

    const serviceResponse = await createSpecificationService.execute({
      name,
      description,
    });

    return response.status(201).json({
      message: "Specification created successfully.",
      serviceResponse,
    });
  }
}
