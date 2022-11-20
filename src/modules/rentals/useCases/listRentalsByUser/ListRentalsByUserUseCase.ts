import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject } from "tsyringe";


class ListRentalByUserUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id)

    return rentalsByUser;
  }
}

export { ListRentalByUserUseCase }