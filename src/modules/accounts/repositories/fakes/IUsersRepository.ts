import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

export interface IUsersRepository {
  create({
    full_name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void>;

  findByEmail(email: string): Promise<User>;

  findByUsername(username: string): Promise<User>;

  findById(id: string): Promise<User>;
}
