import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../repositories/IUsersRepository";

interface IUploadAvatar {
  userId: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatarFile }: IUploadAvatar): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
