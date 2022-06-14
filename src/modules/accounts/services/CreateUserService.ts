import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

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
  }: ICreateUserDTO): Promise<string> {
    const emailArealdyExists = await this.usersRepository.findByEmail(email);

    const usernameAlreadyExists = await this.usersRepository.findByUsername(
      username
    );

    let alreadyExists: string;

    if (emailArealdyExists) {
      alreadyExists = "email";
    } else if (usernameAlreadyExists) {
      alreadyExists = "username";
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

    return alreadyExists;
  }
}
