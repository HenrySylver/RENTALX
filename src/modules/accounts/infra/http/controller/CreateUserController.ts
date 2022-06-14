import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserService } from "../../../services/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserService);

    const { full_name, username, password, email, driver_license } =
      request.body;

    const serviceResponse = await createUserUseCase.execute({
      full_name,
      username,
      password,
      email,
      driver_license,
    });

    if (!serviceResponse) {
      return response
        .status(201)
        .json({ message: "User created successfully." });
    }
    return response.status(500).json({
      message: `The given ${serviceResponse} is already in use by another account. If this is your account, you can submit a request to retrieve it's password at any time or try again registering your account with another ${serviceResponse}.`,
    });
  }
}
