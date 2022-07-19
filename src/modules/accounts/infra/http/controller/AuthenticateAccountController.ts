import { AuthenticateAccountService } from "@modules/accounts/services/AuthenticateAccountService";
import { Response, Request } from "express";
import { container } from "tsyringe";

export class AuthenticateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateAccountService = container.resolve(
      AuthenticateAccountService
    );

    const { email, password } = request.body;

    const serviceResponse = await authenticateAccountService.execute({
      email,
      password,
    });

    return response.status(201).json({
      message: "You've sucessfully authenticated your account.",
      serviceResponse,
    });
  }
}
