import { CreateUserService } from "@modules/accounts/services/CreateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserService);

    const { full_name, username, password, email, driver_license } =
      request.body;

    await createUserUseCase.execute({
      full_name,
      username,
      password,
      email,
      driver_license,
    });

    return response.status(201).json({ message: "User created successfully." });
  }
}
