import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const { name, description } = request.body;

    try {
      await createCategoryUseCase.execute({ name, description });
    } catch (err) {
      return response.status(500).json({ message: (err as Error).message });
    }

    return response
      .status(201)
      .json({ message: "Category created successfully." });
  }
}

export { CreateCategoryController };
