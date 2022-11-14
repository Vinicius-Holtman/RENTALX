import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeaders = req.headers.authorization

  if (!authHeaders) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeaders.split(" ")

  try {
    const { sub: user_id } = verify(token, "2a4d4f0722b8f0ea85bf2926faa59547") as IPayload;

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exists!", 401)
    }
    
    req.user = {
      id: user_id
    }

    next()
  } catch {
    throw new AppError("Invalid token!", 401)
  }
}