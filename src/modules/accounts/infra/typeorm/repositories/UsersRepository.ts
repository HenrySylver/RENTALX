import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { sub } from "date-fns";
import { getRepository, Repository } from "typeorm";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    full_name,
    username,
    password,
    email,
    avatar,
    driver_license,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      full_name,
      username,
      password,
      email,
      driver_license,
      avatar,
      created_at: sub(new Date(), { hours: 3 }),
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({ username });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });

    return user;
  }
}
