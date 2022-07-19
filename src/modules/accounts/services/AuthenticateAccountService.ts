import { IAuthenticateUsersDTO } from "@modules/accounts/dtos/IAuthenticateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { config } from "dotenv";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IAuthentication {
  account_username?: string;
  account_email?: string;
  login_token?: string;
}

config();

@injectable()
export class AuthenticateAccountService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUsersDTO): Promise<IAuthentication> {
    const user = await this.usersRepository.findByEmail(email);

    let authentication: IAuthentication;

    if (!user) {
      throw new AppError(
        "Any registry included doesn't match any of the given credentials. However, all is not lost, please verify your credentials and proceed with a new request.",
        500
      );
    } else {
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError(
          "Any registry included doesn't match any of the given credentials. However, all is not lost, please verify your credentials and proceed with a new request.",
          500
        );
      } else {
        const token = sign({}, process.env.TOKEN_MD5, {
          subject: user.id,
          expiresIn: "1d",
        });

        authentication = {
          account_username: user.username,
          account_email: user.email,
          login_token: token,
        };
      }
    }

    return authentication;
  }
}
