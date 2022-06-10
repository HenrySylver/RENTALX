import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsService } from "../../../services/ListSpecificationsService";

export class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsService = container.resolve(
      ListSpecificationsService
    );

    const all = await listSpecificationsService.execute();

    return response.json(all);
  }
}
