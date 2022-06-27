import { compare } from "bcryptjs";
import { config } from "dotenv";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IAuthenticateUsersDTO } from "../dtos/IAuthenticateUsersDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IAuthentication {
  account_username?: string;
  account_email?: string;
  login_token?: string;
  login_error: boolean;
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
      authentication = {
        login_error: true,
      };
    } else {
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        authentication.login_error = true;
      } else {
        const token = sign({}, "4d4095469362c75adff812bd5bf310ce", {
          subject: user.id,
          expiresIn: "1d",
        });

        authentication = {
          account_username: user.username,
          account_email: user.email,
          login_token: token,
          login_error: false,
        };
      }
    }

    return authentication;
  }
}
