import { Request, Response } from "express";
import { ListRentalByUserUseCase } from "./ListRentalsByUserUseCase";
import { container } from "tsyringe";



class ListRentalByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase)

    const rentals = await listRentalByUserUseCase.execute(user_id)

    return res.json(rentals)
  }
}

export { ListRentalByUserController }