const request = require("supertest");
const { app, validateEmployee, validateCompany } = require("../index");
const http = require("http");

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3000);
});

afterAll(() => {
  server.close();
});

// < ------------------ For API Endpoints ------------------ >

describe("API Endpoints for Employees and Companies", () => {
  // < ------------------ Add a New Employee ------------------ >
  it("should add an employee with valid input", async () => {
    const res = await request(server).post("/api/employees").send({
      name: "John Doe",
      companyId: 1,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "John Doe",
      companyId: 1,
    });
  });

  // Invalid Employee Input
  it("should return 400 for invalid employee input", async () => {
    const res = await request(server).post("/api/employees").send({
      name: "John",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: "Company ID is required and should be a number.",
    });
  });

  // < ------------------ Add a New Company ------------------ >
  it("should add a company with valid input", async () => {
    const res = await request(server).post("/api/companies").send({
      name: "TechCorp",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "TechCorp",
    });
  });

  // Invalid Company Input
  it("should return 400 for invalid company input", async () => {
    const res = await request(server).post("/api/companies").send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: "Company name is required and should be a string.",
    });
  });
});

// < ------------------ For Validation Functions ------------------ >

describe("Validation Functions", () => {
  // < ------------------ Validate Employee ------------------ >
  it("should validate employee input correctly", () => {
    expect(
      validateEmployee({
        name: "John Doe",
        companyId: 1,
      }),
    ).toBeNull();

    expect(validateEmployee({ name: "John Doe" })).toEqual(
      "Company ID is required and should be a number.",
    );

    expect(validateEmployee({ companyId: 1 })).toEqual(
      "Name is required and should be a string.",
    );
  });

  // < ------------------ Validate Company ------------------ >
  it("should validate company input correctly", () => {
    expect(
      validateCompany({
        name: "TechCorp",
      }),
    ).toBeNull();

    expect(validateCompany({})).toEqual(
      "Company name is required and should be a string.",
    );
  });
});
