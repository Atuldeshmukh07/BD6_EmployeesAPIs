const express = require("express");
const { sequelize } = require("./lib/");
const { employee } = require("./models/employee");
const { department } = require("./models/department");
const { role } = require("./models/role");
const { employeeDepartment } = require("./models/employeeDepartment");
const { employeeRole } = require("./models/employeeRole");

const app = express();
app.use(express.json());

// Endpoint to seed database
app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  const departments = await department.bulkCreate([
    { name: "Engineering" },
    { name: "Marketing" },
  ]);

  const roles = await role.bulkCreate([
    { title: "Software Engineer" },
    { title: "Marketing Specialist" },
    { title: "Product Manager" },
  ]);

  const employees = await employee.bulkCreate([
    { name: "Rahul Sharma", email: "rahul.sharma@example.com" },
    { name: "Priya Singh", email: "priya.singh@example.com" },
    { name: "Ankit Verma", email: "ankit.verma@example.com" },
  ]);

  // Associate employees with departments and roles using create method on junction models
  await employeeDepartment.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  });

  await employeeDepartment.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  });
  await employeeRole.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  });

  await employeeDepartment.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  });

  return res.json({ message: "Database seeded!" });
});

// Helper function to get employee's associated departments
async function getEmployeeDepartments(employeeId) {
  const employeeDepartments = await employeeDepartment.findAll({
    where: { employeeId },
  });

  let departmentData;
  for (let empDep of employeeDepartments) {
    departmentData = await department.findOne({
      where: { id: empDep.departmentId },
    });
  }

  return departmentData;
}

// Helper function to get employee's associated roles
async function getEmployeeRoles(employeeId) {
  const employeeRoles = await employeeRole.findAll({
    where: { employeeId },
  });

  let roletData;
  for (let empRole of employeeRoles) {
    roletData = await role.findOne({
      where: { id: empRole.roleId },
    });
  }

  return roletData;
}

// Helper function to get employee details with associated departments and roles
async function getEmployeeDetails(employeeData) {
  const department = await getEmployeeDepartments(employeeData.id);
  const role = await getEmployeeRoles(employeeData.id);

  return {
    ...employeeData.dataValues,
    department,
    role,
  };
}

// < ----------- Exercise 1: Get All Employees ----------- >
async function getAllEmployees() {
  const employees = await employee.findAll();
  const employeeDetails = [];
  for (let emp of employees) {
    const details = await getEmployeeDetails(emp);
    employeeDetails.push(details);
  }
  return employeeDetails;
}

app.get("/employees", async (req, res) => {
  try {
    const employees = await getAllEmployees();
    return res.json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// < ----------- Exercise 2: Get Employee by ID ----------- >
async function getEmployeeDetailsById(employeeId) {
  const employeeIds = await employee.findOne({ where: { id: employeeId } });
  if (!employee) {
    return null;
  }
  const details = await getEmployeeDetails(employeeIds);
  return details;
}

app.get("/employees/details/:id", async (req, res) => {
  const employeeId = req.params.id;
  const employeeDetails = await getEmployeeDetailsById(employeeId);
  if (!employeeDetails) {
    return res.status(404).json({ message: "Employee not found" });
  }
  return res.json({ employee: employeeDetails });
});

// < ----------- Exercise 3: Get Employees by Department ----------- >
async function getEmployeesByDepartment(departmentId) {
  const employeeDepartments = await employeeDepartment.findAll({
    where: { departmentId },
  });
  const employees = [];
  for (let empDep of employeeDepartments) {
    const employeeDep = await employee.findOne({
      where: { id: empDep.employeeId },
    });
    const details = await getEmployeeDetails(employeeDep);
    employees.push(details);
  }
  return employees;
}

app.get("/employees/department/:departmentId", async (req, res) => {
  const departmentId = req.params.departmentId;
  try {
    const employees = await getEmployeesByDepartment(departmentId);
    return res.json({ employees });
  } catch (error) {
    console.error("Error fetching employees by department:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// < ----------- Exercise 4: Get All Employees by Role ----------- >
async function getEmployeesByRole(roleId) {
  const employeeRoles = await employeeRole.findAll({ where: { roleId } });
  const employees = [];
  for (let empRole of employeeRoles) {
    const employeeRole = await employee.findOne({
      where: { id: empRole.employeeId },
    });
    const details = await getEmployeeDetails(employeeRole);
    employees.push(details);
  }
  return employees;
}

app.get("/employees/role/:roleId", async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const employees = await getEmployeesByRole(roleId);
    return res.json({ employees });
  } catch (error) {
    console.error("Error fetching employees by role:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// < ----------- Exercise 5: Get Employees Sorted by Name ----------- >
const getSortedEmployees = async (order) => {
  const employeesSortByName = await employee.findAll({
    order: [["name", order]],
  });
  const employeeDetails = [];

  for (let emp of employeesSortByName) {
    const details = await getEmployeeDetails(emp);
    employeeDetails.push(details);
  }

  return employeeDetails;
};

app.get("/employees/sort-by-name", async (req, res) => {
  try {
    const order = req.query.order === "desc" ? "DESC" : "ASC";
    const employees = await getSortedEmployees(order);
    return res.json({ employees });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// < ----------- Exercise 6: Add a New Employee ----------- >
async function createEmployee(name, email, departmentId, roleId) {
  const addEmployee = await employee.create({ name, email });
  await employeeDepartment.create({ employeeId: addEmployee.id, departmentId });
  await employeeRole.create({ employeeId: addEmployee.id, roleId });
  const details = await getEmployeeDetails(addEmployee);
  return details;
}

app.post("/employees/new", async (req, res) => {
  const { name, email, departmentId, roleId } = req.body;

  try {
    const employeeDetails = await createEmployee(
      name,
      email,
      departmentId,
      roleId,
    );
    return res.json(employeeDetails);
  } catch (error) {
    console.error("Error creating employee:", error);
    return res
      .status(500)
      .json({ message: "Failed to create employee", error: error.message });
  }
});

// < ----------- Exercise 7: Update Employee Details ----------- >
const updateEmployeeDetails = async (id, name, email, departmentId, roleId) => {
  const updateEmployee = await employee.findOne({ where: { id } });
  if (!employee) return null;

  if (name) updateEmployee.name = name;
  if (email) updateEmployee.email = email;
  await updateEmployee.save();

  if (departmentId) {
    await employeeDepartment.destroy({
      where: { employeeId: updateEmployee.id },
    });
    await employeeDepartment.create({
      employeeId: updateEmployee.id,
      departmentId,
    });
  }

  if (roleId) {
    await employeeRole.destroy({ where: { employeeId: updateEmployee.id } });
    await employeeRole.create({ employeeId: updateEmployee.id, roleId });
  }

  return getEmployeeDetails(updateEmployee);
};

app.post("/employees/update/:id", async (req, res) => {
  try {
    const { name, email, departmentId, roleId } = req.body;
    const updatedEmployee = await updateEmployeeDetails(
      req.params.id,
      name,
      email,
      departmentId,
      roleId,
    );

    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    return res.json(updatedEmployee);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// < ----------- Exercise 8: Delete an Employee ------------------ >
async function deleteEmployee(id) {
  await employee.destroy({ where: { id } });
  await employeeDepartment.destroy({ where: { employeeId: id } });
  await employeeRole.destroy({ where: { employeeId: id } });
  return { message: `Employee with ID ${id} has been deleted.` };
}
app.post("/employees/delete", async (req, res) => { 
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Employee ID is required." });
  }
  try {
    const result = await deleteEmployee(id);
    return res.json(result);
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the employee." });
  }
});

// < ----------------- Server Port 3000 ------------------------ >
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
