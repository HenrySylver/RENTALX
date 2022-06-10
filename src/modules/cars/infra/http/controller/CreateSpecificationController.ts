import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationService } from "../../../services/CreateSpecificationService";

export class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createSpecificationService = container.resolve(
      CreateSpecificationService
    );

    const { name, description } = request.body;

    try {
      await createSpecificationService.execute({ name, description });
    } catch (err) {
      return response.status(500).json({ message: (err as Error).message });
    }

    return response
      .status(201)
      .json({ message: "Specification created sucessfully." });
  }
}
