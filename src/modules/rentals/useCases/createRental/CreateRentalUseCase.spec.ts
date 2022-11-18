import dayjs from "dayjs"
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider)
  })

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "1234",
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should be able to create a new rental if there is another open to the same user", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "12345",
        expected_return_date: dayAdd24Hours
      })
  
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "1234",
        expected_return_date: dayAdd24Hours
      })
    }).rejects.toBeInstanceOf(AppError)
  });

  it("should be able to create a new rental if there is another open to the same car", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123",
        expected_return_date: dayAdd24Hours
      })
  
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "123",
        expected_return_date: dayAdd24Hours
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create a new rental with invalid return time", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123",
        expected_return_date: dayjs().toDate()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})