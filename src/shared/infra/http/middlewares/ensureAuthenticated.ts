import auth from "@config/auth";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeaders.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_token
    ) as IPayload;

    req.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
