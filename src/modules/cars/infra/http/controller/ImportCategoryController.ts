import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryService } from "../../../services/ImportCategoryService";

export class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const importCategoryService = container.resolve(ImportCategoryService);

    const { file } = request;

    await importCategoryService.execute(file);

    return response
      .status(201)
      .json({ message: "Category file imported sucessfuly." });
  }
}
