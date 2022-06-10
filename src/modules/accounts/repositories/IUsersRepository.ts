import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export interface IUsersRepository {
  create({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void>;
}
