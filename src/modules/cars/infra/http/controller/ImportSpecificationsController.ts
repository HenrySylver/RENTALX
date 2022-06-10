import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportSpecificationsService } from "../../../services/ImportSpecificationsService";

export class ImportSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const importSpecificationsService = container.resolve(
      ImportSpecificationsService
    );

    const { file } = request;

    await importSpecificationsService.execute(file);

    return response
      .status(201)
      .json({ message: "Specifications file imported sucessfuly." });
  }
}
