import { ListCategoriesService } from "@modules/cars/services/ListCategoriesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesService = container.resolve(ListCategoriesService);

    const all = await listCategoriesService.execute();

    return response.json(all);
  }
}
