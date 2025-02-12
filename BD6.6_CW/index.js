const cors = require("cors");
const express = require("express");
const { getAllEmployees, getEmployeeById } = require("./controllers");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoints
// < ------------------ Get all Employees ------------------ >
app.get("/employees", async (req, res) => {
  const employees = getAllEmployees();
  res.status(200).json(employees);
});

// < ------------------ Get Employee by ID ------------------ >
app.get("/employees/details/:id", async (req, res) => {
  const employee = getEmployeeById(parseInt(req.params.id));
  res.status(200).json(employee);
});

module.exports = { app };
