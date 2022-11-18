import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(card_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.card_id === card_id && rental.end_date === null)
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.user_id === user_id && rental.end_date === null)
  }
}

export { RentalRepositoryInMemory }