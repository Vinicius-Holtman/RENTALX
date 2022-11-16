import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {

  beforeEach(() => {
    createCarUseCase = new CreateCarUseCase();
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
  })
})