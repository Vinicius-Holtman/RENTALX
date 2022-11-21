import { app } from "@shared/infra/http/app"
import request from "supertest"
import { v4 as uuidV4 } from "uuid"
import { hash } from "bcrypt"

import createConnection from "@shared/infra/database"
import { Connection } from "typeorm"

describe("Create Category Controller", () => {
  let connection: Connection

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash("admin", 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX')
      `
    )
  })

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    })

    const { token } = responseToken.body

    await request(app)
    .post("/categories")
    .send({
      name: "Category test 2",
      description: "Category Description"
    })
    .set({
      Authorization: `Bearer ${token}`
    });

    const response = await request(app).get("/categories")

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[0].name).toEqual("Category test 2")
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
})