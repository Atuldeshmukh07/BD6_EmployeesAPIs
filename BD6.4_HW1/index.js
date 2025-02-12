const express = require("express");
const {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById,
} = require("./Employee");
const app = express();
app.use(express.json());

// Exercise 1: Get All Employees
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await getEmployees();
    if (employees.length === 0) {
      return res.status(404).json({ error: "No employees found" });
    }
    return res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 2: Get Employee by ID
app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await getEmployeeById(parseInt(req.params.id));
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 3: Get All Departments
app.get("/api/departments", async (req, res) => {
  try {
    const departments = await getDepartments();
    if (departments.length === 0) {
      return res.status(404).json({ error: "No departments found" });
    }
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 4: Get Department by ID
app.get("/api/departments/:id", async (req, res) => {
  try {
    const department = await getDepartmentById(parseInt(req.params.id));
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app };
