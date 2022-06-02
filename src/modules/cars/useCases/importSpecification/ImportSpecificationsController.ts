import { Request, Response } from "express";

import { ImportSpecificationsUseCase } from "./ImportSpecificationsUseCase";

class ImportSpecificationsController {
  constructor(
    private importSpecificationsUseCase: ImportSpecificationsUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    await this.importSpecificationsUseCase.execute(file);

    return response
      .status(201)
      .json({ message: "Specifications file imported sucessfuly." });
  }
}

export { ImportSpecificationsController };
