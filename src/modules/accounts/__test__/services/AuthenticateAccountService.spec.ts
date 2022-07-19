import { UsersRepository } from "@modules/accounts/__test__/repositories/UsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { AuthenticateAccountService } from "@modules/accounts/services/AuthenticateAccountService";
import { CreateUserService } from "@modules/accounts/services/CreateUserService";

import { AppError } from "@shared/errors/AppError";

let authenticateAccountService: AuthenticateAccountService;

let usersRepository: UsersRepository;

let createUserService: CreateUserService;

describe("Authenticate Account", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();

    authenticateAccountService = new AuthenticateAccountService(
      usersRepository
    );

    createUserService = new CreateUserService(usersRepository);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      full_name: "James Bond",
      username: "007",
      password: "777",
      email: "007@internationalagency.com",
      driver_license: "007-777-JB",
    };

    await createUserService.execute(user);

    const result = await authenticateAccountService.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("login_token");
  });

  it("Shouldn't be able to authenticate a nonexistent user", () => {
    expect(async () => {
      await authenticateAccountService.execute({
        email: "false@bond.com",
        password: "000",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Shouldn't be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        full_name: "James Bond",
        username: "007",
        password: "777",
        email: "007@internationalagency.com",
        driver_license: "007-777-JB",
      };

      await createUserService.execute(user);

      await authenticateAccountService.execute({
        email: user.email,
        password: "000",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
