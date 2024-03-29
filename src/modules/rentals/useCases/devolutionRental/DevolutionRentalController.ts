import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { Request, Response } from "express"
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user
    const { id } = req.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

    const rental = devolutionRentalUseCase.execute({
      id,
      user_id
    })

    return res.status(200).json(rental)
  }
}

export { DevolutionRentalController }