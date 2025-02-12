const { DataTypes, sequelize } = require("../lib/");
const { employee } = require("./employee.js");
const { department } = require("./department.js");

// const employeeDepartment = sequelize.define("employeeDepartment", {
//   employeeId: { type: DataTypes.INTEGER },
//   departmentId: { type: DataTypes.INTEGER },
// });

const employeeDepartment = sequelize.define("employeeDepartment", {
  employeeId: { type: DataTypes.INTEGER, allowNull: false },
  departmentId: { type: DataTypes.INTEGER, allowNull: false },
});

employee.belongsToMany(department, { through: employeeDepartment });
department.belongsToMany(employee, { through: employeeDepartment });

module.exports = { employeeDepartment };
