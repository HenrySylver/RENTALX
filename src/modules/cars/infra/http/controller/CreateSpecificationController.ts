import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationService } from "../../../services/CreateSpecificationService";

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

    if (serviceResponse.err === false) {
      return response.status(201).json({
        message: "Specification created successfully.",
        specification: serviceResponse.specification,
      });
    }
    return response.status(500).json({
      message:
        "This specification already exists, please retry with another specification name.",
      body: serviceResponse.specification,
    });
  }
}
