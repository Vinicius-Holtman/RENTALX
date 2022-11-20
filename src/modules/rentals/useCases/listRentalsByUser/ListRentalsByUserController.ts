import { Request, Response } from "express";
import { ListRentalByUserUseCase } from "./ListRentalsByUserUseCase";
import { container } from "tsyringe";



class ListRentalByUserController {
  async handle(req: Request, res: Response) {
    const { id: user_id } = req.user;


    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase)
  }
}

export { ListRentalByUserController }