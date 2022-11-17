import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"


let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CLS 63",
      description: "Carro de luxo",
      daily_rate: 110.0,
      license_plate: "XXXXXX",
      fine_amount: 40,
      brand: "Mercedes",
      category_id: "category_test"
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by ")
})