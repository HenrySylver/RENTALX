import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IAuthenticateUsersDTO } from "../dtos/IAuthenticateUsersDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IAuthentication {
  auth: {
    account_username?: string;
    account_email?: string;
    login_token?: string;
    login_error: boolean;
  };
}

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
      authentication = {
        auth: {
          login_error: true,
        },
      };
    } else {
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        authentication = {
          auth: {
            login_error: true,
          },
        };
      } else {
        // sha512
        const token = sign(
          {},
          "6fcb0df2e5234447dd0df263f67ae5f381dcfcb6e22f1eadf5f5d3e4b6eed7e5fb3a67ed43a3e4fd1b12cab22a044db1a6a8f3b3fde22335cd47a4e53d43aa72",
          {
            subject: user.id,
            expiresIn: "1d",
          }
        );
        authentication = {
          auth: {
            account_username: user.username,
            account_email: user.email,
            login_token: token,
            login_error: false,
          },
        };
      }
    }

    return authentication;
  }
}
