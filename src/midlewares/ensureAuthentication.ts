import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}
interface IAuth {
  err: boolean;
  message?: string | unknown;
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
    response.status(401).json({ message: auth.message });
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
        response.status(404).json({
          message:
            "This user doesn't exists. However, all is not lost, please verify your credentials and proceed with a new request.",
        });
      }

      next();
    } catch (err) {
      console.log(err);
      auth = {
        err: true,
        message:
          "Unfortunately, your token is incorrect. However, all is not lost, please verify your credentials and proceed with a new request.",
      };
    }
  }

  if (auth.err === true) {
    response.status(401).json({ message: auth.message });
  }
}
