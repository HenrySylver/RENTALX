import { Response, Request } from "express";
import { container } from "tsyringe";

import { AuthenticateAccountService } from "../../../services/AuthenticateAccountService";

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

    if (serviceResponse.auth.login_error === false) {
      return response.status(201).json({
        message: "You've sucessfully authenticated your account.",
        body: serviceResponse,
      });
    }
    return response.status(500).json({
      message:
        "Any registry included doesn't match any of the given credentials. All is not lost, please verify your credentials and proceed with a new request.",
    });
  }
}
