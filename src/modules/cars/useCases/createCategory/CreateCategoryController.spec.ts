import { app } from "@shared/infra/http/app"
import request from "supertest"


describe("Create Category Controller", () => {
  it("should be able to create a new category", async () => {
    const response = await request(app)
    .post("/categories")
    .send({
      name: "Name Category",
      description: "Category Description"
    })

    expect(response).toBe(201)
  })

})