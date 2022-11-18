import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalRepositoryInMemory

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "1234",
      expected_return_date: new Date()
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should be able to create a new rental if there is another open to the same user", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "12345",
        expected_return_date: new Date()
      })
  
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "1234",
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)
  });

  it("should be able to create a new rental if there is another open to the same car", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123",
        expected_return_date: new Date()
      })
  
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "123",
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})