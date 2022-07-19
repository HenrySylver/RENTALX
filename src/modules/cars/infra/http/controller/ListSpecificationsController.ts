import { ListSpecificationsService } from "@modules/cars/services/ListSpecificationsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsService = container.resolve(
      ListSpecificationsService
    );

    const all = await listSpecificationsService.execute();

    return response.json(all);
  }
}
