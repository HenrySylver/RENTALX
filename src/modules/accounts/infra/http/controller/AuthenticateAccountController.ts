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

    const { account_username, account_email, login_token } = serviceResponse;

    const session_info = {
      account_username,
      account_email,
      login_token,
    };

    if (serviceResponse.login_error === false) {
      return response.status(201).json({
        message: "You've sucessfully authenticated your account.",
        session_info,
      });
    }
    return response.status(500).json({
      message:
        "Any registry included doesn't match any of the given credentials. However, all is not lost, please verify your credentials and proceed with a new request.",
    });
  }
}
