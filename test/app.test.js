const request = require("supertest");

const { app, startServer, closeServer } = require("../app");
let authToken;
let userId;
let taskId;
let documentId;
let deploymentId;
let customerId;
let participantId;
describe("Project Management API Tests", () => {
  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await closeServer();
  });
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "deve996",
      password: "password",
      email: "dev996@example.com",
      role: "admin",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toBe("deve996");
  });

  it("should login the user and return authentication token", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "dev99@example.com",
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
    expect(response.body.username).toBe("deve99");
  });

  it("should logout the user", async () => {
    const response = await request(app)
      .delete("/api/auth/logout")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Logged out successfully");
  });

  it("should create a new project", async () => {
    const response = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "dev",
        description: "This is a sample project for demonstrating API payloads.",
        status: "active",
        region: "North America",
        category: "Technology",
        budget: 50,
        loss: 1000.0,
        profit: 7000.0,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("dev");
    projectId = response.body.id;
  });

  it("should get the project by ID", async () => {
    const response = await request(app)
      .get(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(projectId);
    expect(response.body.name).toBe("dev");
  });

  it("should get all projects", async () => {
    const response = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should create a new task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Task 1",
        description: "This is a sample task.",
        status: "pending",
        projectId: 12,
      });

    if (response.status !== 201) {
      console.log("Create Task Error:", response.body);
    }

    expect(response.status).toBe(201);
    taskId = response.body.id;
  });

  it("should get the task by ID", async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`);

    if (response.status !== 200) {
      console.log("Get Task by ID Error:", response.body);
    }

    expect(response.status).toBe(200);
  });

  it("should update the task by ID", async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Updated Task 1",
        description: "This is an updated description.",
        status: "completed",
        projectId: 12,
      });

    if (response.status !== 200) {
      console.log("Update Task Error:", response.body);
    }

    expect(response.status).toBe(200);
  });

  it("should get all tasks", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`);

    if (response.status !== 200) {
      console.log("Get All Tasks Error:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should delete the task by ID", async () => {
    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`);

    if (response.status !== 200) {
      console.log("Delete Task Error:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task deleted successfully");
  });

  it("should create a new document", async () => {
    const response = await request(app)
      .post("/api/documents")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Project Proposal1",
        url: "http://localhost:5000/api/documents",
        projectId: 12,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Project Proposal1");
    documentId = response.body.id;
  });

  it("should get all documents", async () => {
    const response = await request(app)
      .get("/api/documents")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get document by ID", async () => {
    const response = await request(app)
      .get(`/api/documents/${documentId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Project Proposal1");
  });

  it("should delete a document", async () => {
    const response = await request(app)
      .delete(`/api/documents/${documentId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Document deleted successfully");
  });

  it("should create a new deployment", async () => {
    const response = await request(app)
      .post("/api/deployments")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Initial Production Release",
        projectId: 3,
        environment: "local",
        version: "v1.0.0",
        status: "success",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Initial Production Release");
    deploymentId = response.body.id;
  });

  it("should get all deployments", async () => {
    const response = await request(app)
      .get("/api/deployments")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get deployment by ID", async () => {
    const response = await request(app)
      .get(`/api/deployments/${deploymentId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Initial Production Release");
  });

  it("should delete a deployment", async () => {
    const response = await request(app)
      .delete(`/api/deployments/${deploymentId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });
  it("should create a new customer", async () => {
    const response = await request(app)
      .post("/api/customers")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "John milga1",
        email: "john123@example.com",
        phone: "123-456-7890",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("John milga1");
    customerId = response.body.id;
  });

  it("should get customer by ID", async () => {
    const response = await request(app)
      .get(`/api/customers/${customerId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("John milga1");
  });

  it("should update a customer", async () => {
    const response = await request(app)
      .put(`/api/customers/${customerId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "John Doe1",
        email: "john.doe456@example.com",
        phone: "987-654-3210",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doe1");
    expect(response.body.email).toBe("john.doe456@example.com");
    expect(response.body.phone).toBe("987-654-3210");
  });

  it("should delete a customer", async () => {
    const response = await request(app)
      .delete(`/api/customers/${customerId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(204);
  });

  it("should get all customers", async () => {
    const response = await request(app)
      .get("/api/customers")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get project chart data", async () => {
    const response = await request(app)
      .get(`/api/charts/projects/${projectId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });

  it("should get task analytics", async () => {
    const response = await request(app)
      .get(`/api/charts/tasks`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });

  it("should get filter data", async () => {
    const response = await request(app)
      .get(`/api/charts`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });
});
