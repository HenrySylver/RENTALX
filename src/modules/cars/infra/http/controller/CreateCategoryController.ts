import { CreateCategoryService } from "@modules/cars/services/CreateCategoryService";
import { Response, Request } from "express";
import { container } from "tsyringe";

export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCategoryService = container.resolve(CreateCategoryService);

    const { name, description } = request.body;

    const serviceResponse = await createCategoryService.execute({
      name,
      description,
    });

    return response.status(201).json({
      message: "Category created successfully.",
      serviceResponse,
    });
  }
}
