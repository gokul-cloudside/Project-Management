const request = require("supertest");

const { app, startServer, closeServer } = require("../app");
describe("Register API Tests", () => {
  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await closeServer();
  });
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "deve99",
      password: "password",
      email: "dev99@example.com",
      role: "admin",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toBe("deve99");
  });

  it("should login the user and return authentication token", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "dev9936@example.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    authToken = response.body.token;
  });

  it("should get user profile with valid authentication token", async () => {
    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${authToken}`); 

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toBe("deve9936");
  });

  it("should logout the user", async () => {
    const response = await request(app)
      .delete("/api/auth/logout")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Logged out successfully");
  });
});
