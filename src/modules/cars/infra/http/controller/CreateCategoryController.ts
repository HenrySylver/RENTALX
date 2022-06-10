import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCategoryService } from "../../../services/CreateCategoryService";

export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCategoryService = container.resolve(CreateCategoryService);

    const { name, description } = request.body;

    try {
      await createCategoryService.execute({ name, description });
    } catch (err) {
      return response.status(500).json({ message: (err as Error).message });
    }

    return response
      .status(201)
      .json({ message: "Category created successfully." });
  }
}
