const express = require("express");
const app = express();
app.use(express.json());

let employees = [
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

async function getAllEmployees() {
  return employees;
}

async function getEmployeeById(id) {
  return employees.find((emp) => emp.id === id);
}

async function addEmployee(data) {
  data.id = employees.length + 1;
  employees.push(data);
  return data;
}

app.get("/employees", async (req, res) => {
  const allEmployees = await getAllEmployees();
  res.json(allEmployees);
});

app.get("/employees/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const employee = await getEmployeeById(id);
  if (!employee) return res.status(404).send("Employee not found");
  res.json(employee);
});

app.post("/employees/new", async (req, res) => {
  const newEmployee = await addEmployee(req.body);
  res.status(201).json(newEmployee);
});

module.exports = {
  app,
  getAllEmployees,
  getEmployeeById,
  addEmployee,
};
