import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportSpecificationsUseCase } from "./ImportSpecificationsUseCase";

class ImportSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const importSpecificationsUseCase = container.resolve(
      ImportSpecificationsUseCase
    );

    const { file } = request;

    await importSpecificationsUseCase.execute(file);

    return response
      .status(201)
      .json({ message: "Specifications file imported sucessfuly." });
  }
}

export { ImportSpecificationController };
