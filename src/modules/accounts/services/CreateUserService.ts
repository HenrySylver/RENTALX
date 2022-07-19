import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    full_name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const emailArealdyExists = await this.usersRepository.findByEmail(email);

    const usernameAlreadyExists = await this.usersRepository.findByUsername(
      username
    );

    if (emailArealdyExists) {
      throw new AppError(
        "The given email is already in use by another account. If this is your account, you can submit a request to retrieve it's password at any time or try again registering your account with another email adress."
      );
    } else if (usernameAlreadyExists) {
      throw new AppError(
        "The given username is already in use by another account. If this is your account, you can submit a request to retrieve it's password at any time or try again registering your account with another username."
      );
    } else {
      const passwordHash = await hash(password, 8);

      await this.usersRepository.create({
        full_name,
        username,
        password: passwordHash,
        email,
        driver_license,
      });
    }
  }
}
