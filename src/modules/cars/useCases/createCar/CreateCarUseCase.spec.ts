import { AppError } from "@shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("should be ablt to create a new car", async () => {

    await createCarUseCase.execute({
      brand: "Brand", 
      category_id: "category", 
      daily_rate: 100, 
      description: "Description Car", 
      fine_amount: 60, 
      license_plate: "ABC-1234", 
      name: "Name Car"
    })
  });


  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: "Brand", 
        category_id: "category", 
        daily_rate: 100, 
        description: "Description Car", 
        fine_amount: 60, 
        license_plate: "ABC-1234", 
        name: "Name Car 1"
      });

      await createCarUseCase.execute({
        brand: "Brand", 
        category_id: "category", 
        daily_rate: 100, 
        description: "Description Car", 
        fine_amount: 60, 
        license_plate: "ABC-1234", 
        name: "Name Car 2"
      });

    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand", 
      category_id: "category", 
      daily_rate: 100, 
      description: "Description Car", 
      fine_amount: 60, 
      license_plate: "ABC-1234", 
      name: "Name Car 1"
    });

    expect(car.available).toBe(true)
  })
})