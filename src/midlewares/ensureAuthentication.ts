import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IAuth {
  err: boolean;
  message: string | unknown;
}

config();

export async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response> {
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
      verify(token, process.env.TOKEN_MD5);

      auth = {
        err: false,
        message: "Token authenticated sucessfully",
      };
    } catch {
      auth = {
        err: true,
        message:
          "Unfortunately, your token is incorrect. However, all is not lost, please verify your credentials and proceed with a new request.",
      };
    }
  }

  if (auth.err === false) {
    return response.status(201).json({ message: auth.message });
  }
  return response.status(401).json({ message: auth.message });
}
