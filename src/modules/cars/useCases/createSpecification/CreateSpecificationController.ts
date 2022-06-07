import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    const { name, description } = request.body;

    try {
      await createSpecificationUseCase.execute({ name, description });
    } catch (err) {
      return response.status(500).json({ message: (err as Error).message });
    }

    return response
      .status(201)
      .json({ message: "Specification created sucessfully." });
  }
}

export { CreateSpecificationController };
