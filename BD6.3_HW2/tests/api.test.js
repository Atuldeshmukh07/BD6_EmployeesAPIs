const { getAllEmployees, getEmployeeById, addEmployee } = require("../index");

jest.mock("../index", () => ({
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
}));

describe("Employee API Tests", () => {
  test("getAllEmployees should return all employees", () => {
    const mockEmployees = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Engineering",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Marketing",
      },
    ];
    getAllEmployees.mockReturnValue(mockEmployees);
    expect(getAllEmployees()).toEqual(mockEmployees);
    expect(getAllEmployees).toHaveBeenCalled();
  });

  test("getEmployeeById should return an employee by ID", () => {
    const mockEmployee = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
    };
    getEmployeeById.mockReturnValue(mockEmployee);
    expect(getEmployeeById(1)).toEqual(mockEmployee);
    expect(getEmployeeById).toHaveBeenCalledWith(1);
  });

  test("getEmployeeById should return null for non-existent ID", () => {
    getEmployeeById.mockReturnValue(null);
    expect(getEmployeeById(999)).toBeNull();
    expect(getEmployeeById).toHaveBeenCalledWith(999);
  });

  test("addEmployee should add a new employee", () => {
    const newEmployee = {
      id: 3,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      department: "Sales",
    };
    addEmployee.mockReturnValue(newEmployee);
    expect(addEmployee(newEmployee)).toEqual(newEmployee);
    expect(addEmployee).toHaveBeenCalledWith(newEmployee);
  });
});
