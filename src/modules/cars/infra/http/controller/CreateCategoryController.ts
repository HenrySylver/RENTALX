import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCategoryService } from "../../../services/CreateCategoryService";

export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCategoryService = container.resolve(CreateCategoryService);

    const { name, description } = request.body;

    const serviceResponse = await createCategoryService.execute({
      name,
      description,
    });

    if (serviceResponse.err === false) {
      return response.status(201).json({
        message: "Category created successfully.",
        category: serviceResponse.category,
      });
    }
    return response.status(500).json({
      message:
        "This category already exists, please retry with another category name.",
      body: serviceResponse.category,
    });
  }
}
