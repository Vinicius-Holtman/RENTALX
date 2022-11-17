import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe"

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationRepository
  ) {}


  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id)

    if (!carExists) {
      throw new AppError("Car does not exists!")
    }
    
    const specifications = await this.specificationsRepository.findByids(specifications_id);

    carExists.specifications = specifications

    await this.carsRepository.create(carExists)
  }
}

export { CreateCarSpecificationUseCase }