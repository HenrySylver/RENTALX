import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      await this.createSpecificationUseCase.execute({ name, description });
    } catch (err) {
      return response.status(500).json({ message: (err as Error).message });
    }

    return response
      .status(201)
      .json({ message: "Specification created sucessfully." });
  }
}

export { CreateSpecificationController };
