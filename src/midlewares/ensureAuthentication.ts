import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}
interface IAuth {
  err: boolean;
  message?: string;
  user_id?: string;
}

config();

export async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> {
  const [, token] = request.headers.authorization.split(" ");

  let auth: IAuth;

  if (!token) {
    auth = {
      err: true,
      message:
        "Unfortunately, a missing token was expected, please verify your request.",
    };
  } else {
    try {
      const payload = verify(token, process.env.TOKEN_MD5) as IPayload;

      auth = {
        err: false,
        user_id: payload.sub,
      };

      const usersRepository = new UsersRepository();

      const user = await usersRepository.findById(auth.user_id);

      if (!user) {
        auth = {
          err: true,
          message:
            "This user doesn't exists. However, all is not lost, please verify your credentials and proceed with a new request.",
        };
      }

      request.user = {
        id: user.avatar,
      };
    } catch (err) {
      auth = {
        err: true,
        message:
          "Unfortunately, your token is incorrect. However, all is not lost, please verify your credentials and proceed with a new request.",
      };
    }
  }

  if (auth.err === false) {
    next();
  } else {
    response.status(401).json({ message: auth.message });
  }
}
