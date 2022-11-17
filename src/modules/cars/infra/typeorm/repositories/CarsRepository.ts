import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";





class CarsRepository implements ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car> {
    throw new Error("Method not implemented.");
  }
  findByLicensePlate(license_plate: string): Promise<Car> {
    throw new Error("Method not implemented.");
  }
  
}