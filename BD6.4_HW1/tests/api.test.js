const request = require("supertest");
const { app } = require("../index.js");
const {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById,
} = require("../Employee.js");
let http = require("http");

jest.mock("../Employee.js", () => ({
  ...jest.requireActual("../Employee.js"),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  getDepartments: jest.fn(),
  getDepartmentById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Error Handling Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/employees should return 404 if no employees are found.", async () => {
    getEmployees.mockReturnValue([]);

    const response = await request(server).get("/api/employees");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No employees found");
  });

  it("GET /api/employees/:id should return 404 for non-existent ID ", async () => {
    getEmployeeById.mockReturnValue(null);

    const response = await request(server).get("/api/employees/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("Employee not found");
  });

  it("GET /api/departments should return 404 if no departments found.", async () => {
    getDepartments.mockReturnValue([]);

    const response = await request(server).get("/api/departments");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("No departments found");
  });

  it("GET /api/departments/:id should return 404 for non-existent ID ", async () => {
    getDepartmentById.mockReturnValue(null);

    const response = await request(server).get("/api/departments/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("Department not found");
  });
});
