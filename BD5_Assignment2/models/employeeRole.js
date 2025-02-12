const { DataTypes, sequelize } = require("../lib/");
const { employee } = require("./employee.js");
const { role } = require("./role.js");

// const employeeRole = sequelize.define("employeeRole", {
//   employeeId: { type: DataTypes.INTEGER },
//   roleId: { type: DataTypes.INTEGER },
// });
const employeeRole = sequelize.define("employeeRole", {
  employeeId: { type: DataTypes.INTEGER, allowNull: false },
  roleId: { type: DataTypes.INTEGER, allowNull: false },
});

employee.belongsToMany(role, { through: employeeRole });
role.belongsToMany(employee, { through: employeeRole });

module.exports = { employeeRole };
