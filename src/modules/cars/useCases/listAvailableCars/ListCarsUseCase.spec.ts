import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"



let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Available Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
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

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CLS 63",
      description: "Carro de luxo",
      daily_rate: 110.0,
      license_plate: "XXXXXX",
      fine_amount: 40,
      brand: "Mercedes",
      category_id: "category_test"
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Mercedes"
    })

    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CLS 63",
      description: "Carro de luxo",
      daily_rate: 110.0,
      license_plate: "XXXXXX",
      fine_amount: 40,
      brand: "Mercedes",
      category_id: "category_test"
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: "CLS 63"
    })

    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CLS 63",
      description: "Carro de luxo",
      daily_rate: 110.0,
      license_plate: "XXXXXX",
      fine_amount: 40,
      brand: "Mercedes",
      category_id: "category_test"
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_test"
    })

    expect(cars).toEqual([car])
  });
})