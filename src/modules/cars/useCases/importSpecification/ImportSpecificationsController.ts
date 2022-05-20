import { Request, Response } from "express";

import { ImportSpecificationsUseCase } from "./ImportSpecificationsUseCase";

class ImportSpecificationsController {
  constructor(
    private importSpecificationsUseCase: ImportSpecificationsUseCase
  ) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;

    this.importSpecificationsUseCase.execute(file);

    return response
      .status(201)
      .json({ message: "Specifications file imported sucessfuly." });
  }
}

export { ImportSpecificationsController };
